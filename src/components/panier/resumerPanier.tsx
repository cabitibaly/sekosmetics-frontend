"use client"
import { usePanier } from "@/hooks/usePanier"
import PanierCard from "../cards/panierCard"
import Link from "next/link"

interface Props {
    isBtn?: boolean
    isConfirmation?: boolean
}

const ResumerPanier = ({ isBtn = true, isConfirmation = false }: Props) => {
    const { panier } = usePanier()
    const sousTotal: number = panier.reduce((acc, curr) => acc + curr.prixTotal, 0)
    const nbArticcle: number = panier.reduce((acc, curr) => acc + curr.quantiteLigne, 0)

    return (
        <>
            <div className="w-full flex flex-col items-start justify-center gap-4">
                {
                    panier.length > 0 ? 
                        panier.map(item => <PanierCard key={item.articleId} id={item.articleId} />)
                    :
                        <div className="border border-red-4 w-full h-40 flex items-center justify-center gap-4">
                            <div className="line-clamp-2 text-lg text-gris-12 font-bold ">Aucun article</div>
                        </div>
                }
            </div>
            <div className={`self-end border-t border-red-6 pt-4 w-full flex flex-col items-end justify-start gap-4 ${isConfirmation ? "hidden" : ""}`}>
                <div className="w-1/2 flex items-center justify-between max-sm:w-full">
                    <span className="text-left text-xl text-gris-12 font-semibold max-896:text-base max-xs:text-sm">Nombre d&apos;articles</span>
                    <span className="text-left text-xl text-red-8 font-bold max-896:text-base max-xs:text-sm">{nbArticcle}</span>
                </div>
                <div className="w-1/2 flex items-center justify-between max-sm:w-full">
                    <span className="text-left text-xl text-gris-12 font-bold max-896:text-base max-xs:text-sm">Sous-total</span>
                    <span className="text-left text-xl text-red-8 font-bold max-896:text-base max-xs:text-sm">{sousTotal.toLocaleString()} FCFA</span>
                </div>
                <Link href={"/panier/verification"} className={`mt-2 rounded-full font-bold bg-red-8 w-1/2 items-center justify-center text-gris-12 text-lg py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                    max-lg:text-sm max-896:hidden ${isBtn ? "flex" : "hidden"}`}>
                    Commander
                </Link>
            </div>
        </>
    )
}

export default ResumerPanier
