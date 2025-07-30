"use client"
import Image from "next/image"
import CommandeArticleCard from "../cards/commandeArticleCard"

interface Props {
    id: number
    setCommandeId: (id: number) => void
    setPrevCommandeId: (id: number) => void
}

const CommandeDetail = ({ id, setCommandeId, setPrevCommandeId }: Props) => {
    return (
        <div className="overflow-auto pt-4 w-full flex flex-col items-center justify-start gap-6 max-896:!bg-red-2 max-896:!pb-36">
            <div onClick={() => {setCommandeId(0); setPrevCommandeId(0)}} className="relative w-full flex items-center justify-center max-896:!bg-red-2 max-896:py-3 max-896:px-4 max-896:w-screen max-896:z-50 max-896:absolute max-896:top-0 max-896:left-0">
                <button className="cursor-pointer absolute -top-1 left-1 size-10 text-gris-12 text-2xl font-bold transition duration-200 ease-in-out hover:-translate-x-2 max-xl:text-lg max-896:left-4 max-896:top-3">
                    <Image src={"/bouton-retour.svg"} fill alt="retour-btn"/>
                </button>
                <div className="top-1 line-clamp-1 font-jura text-center text-gris-12 text-2xl font-bold">Détails Commande</div>
            </div>
            <div className="mt-4 w-full flex flex-col items-center justify-center gap-4">
                <div className="w-full flex items-center justify-between max-sm:w-full">
                    <span className="text-left text-base text-gris-12 font-semibold max-xs:text-sm">Numero de commande</span>
                    <span className="text-left text-base text-red-8 font-bold max-xs:text-sm">CMD-178</span>
                </div>
                <div className="w-full flex items-center justify-between max-sm:w-full">
                    <span className="text-left text-base text-gris-12 font-bold max-xs:text-sm">Date de commande</span>
                    <span className="text-left text-base text-red-8 font-bold max-xs:text-sm">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="w-full flex items-center justify-between max-sm:w-full">
                    <span className="text-left text-base text-gris-12 font-bold max-xs:text-sm">Total</span>
                    <span className="text-left text-base text-red-8 font-bold max-xs:text-sm">10 000 FCFA</span>
                </div>
            </div>
            <hr className="w-full border border-gris-6" />
            <div className="w-full flex flex-col items-start justify-start gap-3">
                <span className="text-left text-base text-gris-12 font-bold max-xs:text-sm">Statut de la commande</span>
                <div className="w-full flex items-center justify-between gap-4  max-sm:!gap-2">
                    <div className="w-1/4 p-[5px] rounded-full bg-vert" />
                    <div className="w-1/4 p-[5px] rounded-full bg-jaune" />
                    <div className="w-1/4 p-[5px] rounded-full bg-gris-4" />
                    <div className="w-1/4 p-[5px] rounded-full bg-gris-4" />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <span className="text-left text-base text-gris-12 font-bold max-xs:text-sm">Confirméé</span>
                    <span className="text-gris-8 text-sm font-semibold max-[320px]:!text-xs">{new Date().toLocaleDateString()}</span>
                </div>                
            </div>
            <hr className="w-full border border-gris-6" />
            <div className="w-full flex flex-col items-start justify-start gap-2">
                <span className="text-left text-base text-gris-12 font-bold max-xs:text-sm">Adresse de livraison</span>
                <span className="text-left text-base text-gris-8 font-normal max-xs:text-sm">Côte d&apos;Ivoire</span>
                <span className="text-left text-base text-gris-8 font-normal max-xs:text-sm">Abidjan</span>
                <span className="text-left text-base text-gris-8 font-normal max-xs:text-sm">Adjamé</span>
                <span className="text-left text-base text-gris-8 font-normal max-xs:text-sm">Makan Traoré</span>
            </div>
            <hr className="w-full border border-gris-6" />
            <div className="w-full flex flex-col items-start justify-start gap-2">
                <span className="text-left text-base text-gris-12 font-bold max-xs:text-sm">Mode de paiement</span>
                <span className="text-left text-base text-red-8 font-normal max-xs:text-sm">Payé à la livraison</span>
            </div>
            <hr className="w-full border border-gris-6" />
            <div className="w-full flex flex-col items-start justify-start gap-4">
                <span className="text-left text-base text-gris-12 font-bold max-xs:text-sm">Articles</span>
                <CommandeArticleCard />
            </div>
        </div>
    )
}

export default CommandeDetail
