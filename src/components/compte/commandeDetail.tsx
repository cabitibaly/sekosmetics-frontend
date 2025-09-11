"use client"
import Image from "next/image"
import CommandeArticleCard from "../cards/commandeArticleCard"
import { useGetUneCommande } from "@/hooks/commande-fetch/commandeFetch"
import { statutLisible } from "@/utils/statutLisible"
import { useState } from "react"
import RetourModal from "../modal/retourModal"
import { MoonLoader } from "react-spinners"

interface Props {
    id: number
    setCommandeId: (id: number | null) => void
}

const CommandeDetail = ({ id, setCommandeId}: Props) => {
    const {commande, adresseLivraison, historiqueStatut, lignesCommande, isLoading} = useGetUneCommande(id)
    const [openRetour, setOpenRetour] = useState<boolean>(false)
    const [ligneId, seLigneId] = useState<number | null>(null)

    return (
        <>
            
            {    
                isLoading ?
                    <div className="w-full h-full flex items-center justify-center">
                        <MoonLoader
                            color="#FF7993"
                            size={24}
                        />
                    </div>
                :
                <div className="overflow-auto pt-4 w-full flex flex-col items-center justify-start gap-6 max-896:!bg-red-2 max-896:!pb-36">
                    <div onClick={() => {setCommandeId(0)}} className="relative w-full flex items-center justify-center max-896:!bg-red-2 max-896:py-3 max-896:px-4 max-896:w-screen max-896:z-50 max-896:absolute max-896:top-0 max-896:left-0">
                        <button className="cursor-pointer absolute -top-1 left-1 size-10 text-gris-12 text-2xl font-bold transition duration-200 ease-in-out hover:-translate-x-2 max-xl:text-lg max-896:left-4 max-896:top-3">
                            <Image src={"/bouton-retour.svg"} fill alt="retour-btn"/>
                        </button>
                        <div className="top-1 line-clamp-1 font-jura text-center text-gris-12 text-2xl font-bold">Détails Commande</div>
                    </div>
                    <div className="mt-4 w-full flex flex-col items-center justify-center gap-4">
                        <div className="w-full flex items-center justify-between max-sm:w-full">
                            <span className="text-left text-base text-gris-12 font-semibold max-xs:text-sm">Numero de commande</span>
                            <span className="text-left text-base text-red-8 font-bold max-xs:text-sm">{commande?.numeroCommande.toUpperCase()}</span>
                        </div>
                        <div className="w-full flex items-center justify-between max-sm:w-full">
                            <span className="text-left text-base text-gris-12 font-bold max-xs:text-sm">Date de commande</span>
                            <span className="text-left text-base text-red-8 font-bold max-xs:text-sm">{new Date(commande?.dateCreationCommande || "").toLocaleDateString()}</span>
                        </div>
                        <div className="w-full flex items-center justify-between max-sm:w-full">
                            <span className="text-left text-base text-gris-12 font-bold max-xs:text-sm">Total</span>
                            <span className="text-left text-base text-red-8 font-bold max-xs:text-sm">{commande?.montantTotal} FCFA</span>
                        </div>
                    </div>
                    <hr className="w-full border border-gris-6" />
                    <div className="w-full flex flex-col items-start justify-start gap-3">
                        <span className="text-left text-base text-gris-12 font-bold max-xs:text-sm">Statut de la commande</span>
                        <div className="w-full flex items-center justify-between gap-4  max-sm:!gap-2">
                            <div className={`w-1/4 p-[5px] rounded-full ${["CREEE", "CONFIRMEE", "EXPEDIEE", "LIVREE"].includes(historiqueStatut[historiqueStatut.length - 1]?.statutActuel || "") ? "bg-vert" : "bg-gris-4"}`} />
                            <div className={`w-1/4 p-[5px] rounded-full ${["CONFIRMEE", "EXPEDIEE", "LIVREE"].includes(historiqueStatut[historiqueStatut.length - 1]?.statutActuel || "") ? "bg-vert" : "bg-gris-4"}`} />
                            <div className={`w-1/4 p-[5px] rounded-full ${["EXPEDIEE", "LIVREE"].includes(historiqueStatut[historiqueStatut.length - 1]?.statutActuel || "") ? "bg-vert" : "bg-gris-4"}`} />
                            <div className={`w-1/4 p-[5px] rounded-full ${historiqueStatut[historiqueStatut.length - 1]?.statutActuel === "LIVREE" ? "bg-vert" : "bg-gris-4"}`} />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <span className="text-left text-base text-gris-12 font-bold max-xs:text-sm">{statutLisible(commande?.statutCommande || "")}</span>
                            <span className="text-gris-8 text-sm font-semibold max-[320px]:!text-xs">{new Date(historiqueStatut[historiqueStatut.length - 1]?.dateChangement).toLocaleDateString()}</span>
                        </div>                
                    </div>
                    <hr className="w-full border border-gris-6" />
                    <div className="w-full flex flex-col items-start justify-start gap-2">
                        <span className="text-left text-base text-gris-12 font-bold max-xs:text-sm">Adresse de livraison</span>
                        <span className="text-left text-base text-gris-8 font-normal max-xs:text-sm">{adresseLivraison?.pays}</span>
                        <span className="text-left text-base text-gris-8 font-normal max-xs:text-sm">{adresseLivraison?.ville}</span>
                        <span className="text-left text-base text-gris-8 font-normal max-xs:text-sm">{adresseLivraison?.commune}</span>
                        <span className="text-left text-base text-gris-8 font-normal max-xs:text-sm">{adresseLivraison?.quartier}</span>
                    </div>
                    <hr className="w-full border border-gris-6" />
                    <div className="w-full flex flex-col items-start justify-start gap-2">
                        <span className="text-left text-base text-gris-12 font-bold max-xs:text-sm">Mode de paiement</span>
                        <span className="text-left text-base text-red-8 font-normal max-xs:text-sm">Payé à la livraison</span>
                    </div>
                    <hr className="w-full border border-gris-6" />
                    <div className="w-full flex flex-col items-start justify-start gap-4">
                        <span className="text-left text-base text-gris-12 font-bold max-xs:text-sm">Articles</span>
                        {
                            lignesCommande.map((ligne) => (
                                <CommandeArticleCard
                                    key={ligne.idLigne}
                                    ligne={ligne}
                                    setLigneId={seLigneId}
                                    isModalOpen={openRetour}
                                    setIsModalOpen={setOpenRetour} 
                                    statutCommande={commande?.statutCommande || ""} 
                                    date={historiqueStatut[historiqueStatut.length - 1]?.statutActuel === "LIVREE" ? historiqueStatut[historiqueStatut.length - 1]?.dateChangement : null}                          
                                />
                            ))
                        }
                    </div>
                    {
                        openRetour &&
                        <RetourModal  
                            isModalOpen={openRetour}
                            setIsModalOpen={setOpenRetour}
                            ligneId={ligneId}
                            commandeId={id}
                        />
                    }
                </div>
            }
        </>
    )
}

export default CommandeDetail
