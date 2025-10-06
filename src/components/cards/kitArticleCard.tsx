"use client"
import Image from "next/image"

interface Props {
    id: number,
    nom: string,
    image: string,
    prix: number,
    setIdArticle: React.Dispatch<React.SetStateAction<number | null>>
}

const KitArticleCard = ({id, setIdArticle, nom, image, prix}: Props) => {

    return (       
        <div onClick={() => setIdArticle(id)} className="relative border border-red-4 rounded-3xl w-full h-full flex flex-col items-start justify-start gap-3">
            <div className="relative aspect-square w-full flex items-center justify-center">
                <Image src={image} fill alt="kit" className="rounded-3xl" />
            </div>
            <div className="px-2 pb-2 w-full flex flex-col items-start justify-center gap-2">
                <p className="line-clamp-2 text-base text-gris-12 font-semibold text-left max-xl:text-sm max-lg:text-xs">
                    {nom}
                </p>
                <span className="text-red-8 text-base text-left font-bold max-xl:text-sm max-lg:text-xs">{prix.toLocaleString("fr-FR")} FCFA</span>
            </div>            
        </div>
    )
}

export default KitArticleCard
