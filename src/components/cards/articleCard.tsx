"use client"
import { ArticleCardType } from "@/types/articleCardType"
import Image from "next/image"
import Link from "next/link"
import HeartActive from "../../../public/svg/heartActive"
import HeartIcon from "../../../public/svg/heartIcon"
import { useEffect, useState } from "react"
import { useFavoris } from "@/hooks/useFavoris"
import { appliquerReduction } from "@/utils/appliquerReduction"

const ArticleCard = ({id, nom, image, prix, notaion, estFavori = false, refechFavoris, reduction}: ArticleCardType) => {
    const [isFavoris, setIsFavoris] = useState<boolean>(estFavori)
    const { ajouterSupprimerFavoris } = useFavoris({ id, setIsFavoris, isFavoris, refechFavoris })

    useEffect(() => {
        setIsFavoris(estFavori)
    }, [estFavori])

    return (
        <Link href={`/article/${id}`} className="border border-red-4 relative rounded-3xl h-full flex flex-col items-start justify-center">
            {
                reduction && reduction.estActive && 
                    <div className="absolute top-3 left-3 z-10 bg-red-8/80 rounded-lg text-sm text-red-1 font-bold px-1.5 py-1">
                        {reduction.type === "POURCENTAGE" && `-${reduction.valeur}%`}
                        {reduction.type === "MONTANT_FIXE" && `-${reduction.valeur} FCFA`}
                    </div>
            }            
            <div className="w-full aspect-square relative rounded-3xl flex items-center justify-center">
                <Image src={image} fill alt='Beauty planet' className='rounded-3xl' />
            </div>
            <div className="p-2.5 py-4 w-full h-full flex flex-col items-start justify-center gap-1 max-[360px]:items-center">
                <p className="line-clamp-2 text-base text-gris-12 font-semibold text-left max-896:text-sm max-sm:text-xs max-[360px]:text-center">
                    {nom}
                </p>
                <div className="w-full flex items-center justify-between max-[360px]:flex-col max-[360px]:gap-2">
                    <div className="flex flex-col items-start justify-between gap-1">
                        <span className={`text-red-8 text-lg text-left font-bold max-md:text-sm ${reduction?.estActive ? "block" : "hidden"}`}>
                            {appliquerReduction(reduction?.type || "", reduction?.valeur || 0, prix, reduction?.estActive || false)?.toLocaleString("fr-FR")} FCFA                            
                        </span>
                        <span className={`text-left font-bold ${reduction?.estActive ? "text-gris-8 text-sm line-through" : "text-red-8 text-lg max-md:text-sm"}`}>{prix.toLocaleString("fr-FR")} FCFA</span>
                    </div>                    
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
                    ajouterSupprimerFavoris(!isFavoris)
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
