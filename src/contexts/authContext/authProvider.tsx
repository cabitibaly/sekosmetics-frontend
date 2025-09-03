"use client"
import { useState } from "react";
import AuthContext from "./authContext"
import axios from "axios";
import type { UtilisateurType } from "../../types/utilisateurType";
import type { ConnexionField } from "../../types/connexionField";
import { baseUrl } from "../../constant/baseUrl";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [utilisateur, setUtilisateur] = useState<UtilisateurType | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);    
    const router = useRouter();

    const { isLoading, refetch: refetchUtilisateur } = useQuery({
        queryKey: ["utilisateur"],
        queryFn: async () => axios.get(
            `${baseUrl}/info`, 
            { withCredentials: true }
        ).then(res => {
            if(res.data.status === 200) {
                setIsAuthenticated(true);
                setUtilisateur(res.data.utilisateur);
                return res.data.utilisateur
            }
            return null;
        }),
        staleTime: 60 * 60 * 1000,        
    })

    const login = (data: ConnexionField) => {
        axios.post(
            `${baseUrl}/connexion`,
            data,
            {
                withCredentials: true
            }            
        ).then((res) => {
            if(res.data.status === 200) {
                setIsAuthenticated(true);
                setUtilisateur(res.data.utilisateur);                
                toast(`Bienvenue ${res.data.utilisateur.prenom} ${res.data.utilisateur.nom}`, {
                    type: "success",
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });                
                router.push("/");
            }
        }).catch((err) => {
            toast.error(
                err.response?.data.message || "Une erreur est survenue, veuillez réessayer plus tard",
                {
                    type: "error",
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                }
            )
        });
    }   
    
    const logout = () => {
        axios.post(
            `${baseUrl}/deconnexion`,
            {},
            {
                withCredentials: true
            }
        ).then((res) => {
            if(res.data.status === 200) {
                setIsAuthenticated(false);
                setUtilisateur(null);                
                toast("Deconnexion réussie", {
                    type: "success",
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
                setTimeout(() => {
                    router.push("/");;
                }, 2000);                               
            }
        }).catch((err) => {
            toast.error(
                err.response?.data.message || "Une erreur est survenue, veuillez réessayer plus tard",
                {
                    type: "error",
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                }
            )
        });
    }

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                utilisateur,
                isAuthenticated,
                login,
                logout,
                refetchUtilisateur
            }}
        >            
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
