"use client"
import { useKit } from "@/hooks/useKit"
import { Check } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Props {
    id: number,
    nom: string,
    image: string,
    prix: number
}

const KitArticleCard = ({id, nom, image, prix}: Props) => {
    const [estSelectionne, setEstSelectionne] = useState<boolean>(false)
    const { kit, ajouterLigneKit } = useKit()

    useEffect(() => {

        if(kit.find(k => k?.articleId === Number(id))) {
            setEstSelectionne(true)
        } else {
            setEstSelectionne(false)
        }

    }, [kit, id])


    return (
        <div onClick={() => ajouterLigneKit(id)} className="relative border border-red-4 rounded-3xl w-full h-full flex flex-col items-start justify-start gap-3">
            <div className="relative aspect-square w-full flex items-center justify-center">
                <Image src={image} fill alt="kit" className="rounded-3xl" />
            </div>
            <div className="px-2 pb-2 w-full flex flex-col items-start justify-center gap-2">
                <p className="line-clamp-2 text-base text-gris-12 font-semibold text-left max-xl:text-sm max-lg:text-xs">
                    {nom}
                </p>
                <span className="text-red-8 text-base text-left font-bold max-xl:text-sm max-lg:text-xs">{prix.toLocaleString("fr-FR")} FCFA</span>
            </div>
            {   
                estSelectionne &&
                <div className="absolute -top-2 -right-2 size-8 rounded-full bg-red-8 flex items-center justify-center">
                    <Check className="size-4 stroke-gris-12" />
                </div>
            }
        </div>
    )
}

export default KitArticleCard
