import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "@/constant/baseUrl";

interface UseFavorisProps {
  id: number | string;
  initialFavoris?: boolean;
  refechFavoris?: () => void;
  setIsFavoris: React.Dispatch<React.SetStateAction<boolean>>;
  isFavoris: boolean;
}

export const useFavoris = ({ id, setIsFavoris, isFavoris, refechFavoris }: UseFavorisProps) => {

    const ajouterSupprimerFavoris = (favoris: boolean) => {
        if (favoris) {
            axios.post(
                `${baseUrl}/article/mettre-en-favoris/${id}`,
                {},
                { withCredentials: true }
            ).then(res => {
                if (res.data.status === 201) {
                toast.success("L'article a bien été ajouté à vos favoris", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
                refechFavoris?.();
                setIsFavoris(!isFavoris);
                }
            }).catch(err => {
                toast.error(
                err.response?.data.message || "Une erreur est survenue, veuillez réessayer plus tard",
                {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                }
                );
            });
        } else {
            axios.delete(
                `${baseUrl}/article/supprimer-favoris/${id}`,
                { withCredentials: true }
            ).then(res => {
                if (res.data.status === 200) {
                toast.success("L'article a bien été supprimé de vos favoris", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
                setIsFavoris(!isFavoris);
                refechFavoris?.();
                }
            }).catch(err => {
                toast.error(
                err.response?.data.message || "Une erreur est survenue, veuillez réessayer plus tard",
                {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                }
                );
            });
        }
    };

    return {        
        ajouterSupprimerFavoris
    };
};
