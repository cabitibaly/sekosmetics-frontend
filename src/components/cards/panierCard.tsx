"use client"
import { Dot, Minus, Plus } from "lucide-react"
import Image from "next/image"
import TrashIcon from "../../../public/svg/trash"
import { usePanier } from "@/hooks/usePanier"
import { useEffect, useState } from "react"

interface Props {
    id: number        
}

const PanierCard = ({ id }: Props) => { 
    const [quantite, setQuantite] = useState<number>(1)    
    const { supprimerLigne, articleExiste, modifierQuantiteLigne } = usePanier()    
    const articleDansPanier = articleExiste(Number(id))

    useEffect(() => {
        if(articleDansPanier) {
            setQuantite(articleDansPanier.quantiteLigne)
        }
    }, [articleDansPanier])

    const augmenterQuantite = () => {
        setQuantite(prev => prev + 1)
        modifierQuantiteLigne(id, quantite + 1)
    }

    const diminuerQuantite = () => {
        if(quantite > 1) {
            setQuantite(prev => prev - 1)
            modifierQuantiteLigne(id, quantite - 1)
        } else {
            supprimerLigne(id)
        }
    }

    return (
        <div className="relative border border-red-6 p-4 rounded-3xl w-full flex items-center justify-between gap-4 max-896:p-2 max-sm:rounded-xl">
            <button onClick={() => supprimerLigne(id)} className="cursor-pointer absolute -top-2 -right-2 size-7 rounded-full bg-red-8 flex items-center justify-center max-sm:size-5">
                <TrashIcon color="#1E1F24" className="size-5 max-sm:size-4" />
            </button>
            <div className="flex items-center justify-start gap-4">
                <div className="relative size-32 rounded-3xl aspect-square max-896:size-24 max-896:rounded-2xl max-sm:size-16 max-sm:rounded-xl">
                    <Image src={articleDansPanier?.image as string} fill alt="panier" className="rounded-3xl max-896:rounded-2xl max-sm:rounded-xl" />
                </div>
                <div className="flex flex-col items-start justify-center gap-2">
                    <div className="w-[90%] line-clamp-2 text-base text-gris-12 font-bold max-896:text-base max-sm:text-xs">{articleDansPanier?.nomArticle}</div>
                    <div className="flex items-center justify-center gap-1">
                        <div className="line-clamp-2 text-base text-red-8 font-bold max-896:text-base max-sm:text-xs">{articleDansPanier?.prixUnitaire.toLocaleString()} FCFA</div>                        
                        <Dot className="stroke-gris-8 size-6 max-sm:size-4" />
                        <span className="text-gris-8 text-sm font-semibold max-sm:!text-xs">{articleDansPanier?.valeursOption?.map(vo => vo.valeurOption).join(", ")}</span>
                    </div>                    
                </div>
            </div>
            <div className="self-end flex items-center justify-center gap-4 max-896:gap-2">
                <button onClick={() => diminuerQuantite()} className="cursor-pointer">
                    <Minus strokeWidth={1.25} className="stroke-red-6 size-6 transition duration-300 ease-in-out hover:stroke-[2] hover:stroke-red-8 max-896:size-5" />
                </button>
                <span className="text-red-8 text-lg font-bold max-896:text-base max-sm:text-sm">{quantite}</span>
                <button onClick={() => augmenterQuantite()} className="cursor-pointer">
                    <Plus strokeWidth={1.25} className="stroke-red-6 size-6 transition duration-300 ease-in-out hover:stroke-[2] hover:stroke-red-8 max-896:size-5" />
                </button>
            </div>
        </div>
    )
}

export default PanierCard
