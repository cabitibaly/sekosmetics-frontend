"use client"
import { ArticleCardType } from "@/types/articleCardType"
import Image from "next/image"
import Link from "next/link"
import HeartActive from "../../../public/svg/heartActive"
import HeartIcon from "../../../public/svg/heartIcon"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "@/constant/baseUrl"
import { toast } from "react-toastify"

const ArticleCard = ({id, nom, image, prix, notaion, estFavori = false, refechFavoris}: ArticleCardType) => {
    const [isFavoris, setIsFavoris] = useState<boolean>(estFavori)

    useEffect(() => {
        setIsFavoris(estFavori)
    }, [estFavori])

    const AjouterSupprimerFavoris = (favoris: boolean) => {        
        if(favoris) {
            axios.post(
                `${baseUrl}/article/mettre-en-favoris/${id}`,
                {},
                {withCredentials: true}
            ).then(res => {
                if(res.data.status === 201) {
                    toast.success(
                        "L'article a bien été ajouté à vos favoris",
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
                    )
                    refechFavoris?.()
                    setIsFavoris(!isFavoris)
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
                )
            })
        } else {
            axios.delete(
                `${baseUrl}/article/supprimer-favoris/${id}`,
                {withCredentials: true}
            ).then(res => {
                if(res.data.status === 200) {
                    toast.success(
                        "L'article a bien été supprimé de vos favoris",
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
                    )
                    setIsFavoris(!isFavoris)
                    refechFavoris?.()
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
                )
            })
        }
    }

    return (
        <Link href={`/article/${id}`} className="border border-red-4 relative rounded-3xl h-full flex flex-col items-start justify-center">
            <div className="w-full aspect-square relative rounded-3xl flex items-center justify-center">
                <Image src={image} fill alt='Beauty planet' className='rounded-3xl' />
            </div>
            <div className="p-2.5 py-4 w-full h-full flex flex-col items-start justify-center gap-1 max-[360px]:items-center">
                <p className="line-clamp-2 text-base text-gris-12 font-semibold text-left max-896:text-sm max-sm:text-xs max-[360px]:text-center">
                    {nom}
                </p>
                <div className="w-full flex items-center justify-between max-[360px]:flex-col max-[360px]:gap-2">
                    <span className="text-red-8 text-lg text-left font-bold max-md:text-sm">{prix.toLocaleString("fr-FR")} FCFA</span>
                    <div className="flex justify-center gap-1">
                        <div className="relative size-4 aspect-square flex items-center justify-center max-md:size-3">
                            <Image src={"/star.svg"} fill alt="star"/>                            
                        </div>
                        <span className="text-gris-12 text-sm font-bold max max-md:text-xs">{notaion}</span>
                    </div>
                </div>
            </div>
            <div 
                onClick={(e) => {
                    e.stopPropagation(); 
                    e.preventDefault();
                    AjouterSupprimerFavoris(!isFavoris)
                }} 
                className="p-2 z-10 absolute top-1 right-2 rounded-full bg-gris-3 size-10 flex items-center justify-center cursor-pointer transition duration-200 ease-in-out hover:scale-95 max-md:p-1 max-md:size-6">
                {
                    isFavoris ?
                    <HeartActive color="#FF7993" className="size-full" /> :
                    <HeartIcon className="size-full" />                    
                }
            </div>
        </Link>
    )
}

export default ArticleCard
