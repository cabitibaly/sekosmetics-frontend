"use client"
import { baseUrl } from "@/constant/baseUrl"
import { useAuth } from "@/hooks/useAuth"
import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import { toast } from "react-toastify"

interface Props {
    idArticle: string,
    refetch: () => void
}

const AjouterCommentaire = ({idArticle, refetch}: Props) => {
    const [commentaire, setCommentaire] = useState("")
    const [notation, setNotation] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const { isAuthenticated, utilisateur } = useAuth()

    const ajouterCommentaire = () => {
        if(commentaire === "") {
            toast.error(
                "Veuillez saisir un commentaire !",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                }                    
            )
            return
        }

        if(notation === 0) {
            toast.error(
                "Veuillez sélectionner une notation !",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                }                    
            )
            return
        }

        setIsLoading(true)        

        axios.post(
            `${baseUrl}/article/${idArticle}/avis/ajouter`,
            {
                commentaire,
                notation
            },
            {withCredentials: true}
        ).then(res => {
            if(res.status === 201) {
                toast.success(
                    "Commentaire ajouté avec succès !",
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    }                    
                )

                refetch()
            }
        }).catch(err => {
            toast.error(
                err.response.data.message || "Une erreur est survenue lors de l'ajout du commentaire !",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                }                    
            )
        }).finally(() => setIsLoading(false))        
    }

    return (
        <div className={`pb-6 border-b border-gris-8 w-full items-start justify-center gap-4 ${isAuthenticated ? "flex" : "hidden"}`}>
            {
                utilisateur?.img ? 
                    <div className="relative size-12 aspect-square rounded-full flex items-center justify-center max-lg:size-10">
                        <Image src={utilisateur?.img} fill alt="profil" className="aspect-square rounded-full" />
                    </div>
                :
                    <div className="relative bg-red-6 size-12 aspect-square rounded-full flex items-center justify-center max-lg:size-10">
                        <span className="text-base text-red-1 font-bold">{utilisateur?.nomClient.charAt(0)}</span>
                    </div>
            }   
            <div className="flex flex-1 flex-col items-start justify-start gap-3">
                <div className="w-full flex items-center justify-center">
                    <label htmlFor="commentaire" className="sr-only">Commentaire</label>
                    <textarea value={commentaire} onChange={(e) => setCommentaire(e.target.value)} name="commentaire"  id="commentaire" className="border border-red-4 bg-transparent rounded-2xl  w-full h-24 p-2 text-base text-gris-12 resize-none outline-none focus:ring-red-6 focus:border-red-6 max-md:text-sm max-xs:text-xs"placeholder="Ajouter un commentaire..." ></textarea>
                </div>
                <div className="w-full flex items-center justify-between gap-4">
                    <div className="rating">
                        {[1, 2, 3, 4, 5].map((note) => (
                            <input
                            key={note}
                            type="radio"
                            name="rating-6"
                            onChange={() => setNotation(note)}
                            className="mask mask-star bg-jaune max-lg:size-4"
                            aria-label={`${note} star`}
                            />
                        ))}
                    </div>
                    <button onClick={() => ajouterCommentaire()} disabled={isLoading} className={`carousel-item rounded-full font-bold text-base py-1.5 px-3 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-lg:text-sm max-md:text-xs bg-red-8 text-gris-12`}>
                        Soumettre
                    </button>
                </div>
            </div>  
        </div>
    )
}

export default AjouterCommentaire
