"use client"
import Image from "next/image"
import { statutRetourLisible } from "@/utils/statutLisible"
import { useGetUnRetour } from "@/hooks/retour-fetch/retourFetch"
import RetourArticleCard from "../cards/RetourArticleCard"

interface Props {
    id: number
    setRetourId: (id: number | null) => void
}

const RetourDetail = ({ id, setRetourId}: Props) => {
    const { retour, commande, ligneCommande } = useGetUnRetour(id)

    return (
        <div className="overflow-auto pt-4 w-full flex flex-col items-center justify-start gap-6 max-896:!bg-red-2 max-896:!pb-36">
            <div onClick={() => {setRetourId(null)}} className="relative w-full flex items-center justify-center max-896:!bg-red-2 max-896:py-3 max-896:px-4 max-896:w-screen max-896:z-50 max-896:absolute max-896:top-0 max-896:left-0">
                <button className="cursor-pointer absolute -top-1 left-1 size-10 text-gris-12 text-2xl font-bold transition duration-200 ease-in-out hover:-translate-x-2 max-xl:text-lg max-896:left-4 max-896:top-3">
                    <Image src={"/bouton-retour.svg"} fill alt="retour-btn"/>
                </button>
                <div className="top-1 line-clamp-1 font-jura text-center text-gris-12 text-2xl font-bold">Détails Retour</div>
            </div>
            <div className="mt-4 w-full flex flex-col items-center justify-center gap-4">
                <div className="w-full flex items-center justify-between max-sm:w-full">
                    <span className="text-left text-base text-gris-12 font-semibold max-xs:text-sm">Numero de retour</span>
                    <span className="text-left text-base text-red-8 font-bold max-xs:text-sm">{retour?.numeroRetour.toUpperCase()}</span>
                </div>
                <div className="w-full flex items-center justify-between max-sm:w-full">
                    <span className="text-left text-base text-gris-12 font-bold max-xs:text-sm">Date d&apos;émission</span>
                    <span className="text-left text-base text-red-8 font-bold max-xs:text-sm">{new Date(retour?.dateCreationRetour || "").toLocaleDateString()}</span>
                </div>
            </div>
            <hr className="w-full border border-gris-6" />
            <div className="w-full flex flex-col items-start justify-start gap-3">
                <span className="text-left text-base text-gris-12 font-bold max-xs:text-sm">Statut de la requête</span>
                <div className="w-full flex items-center justify-between gap-4  max-sm:!gap-2">
                    {retour?.statutRetour === "APPROUVE" && <div className={`w-full p-[5px] rounded-full bg-vert`} /> }
                    {retour?.statutRetour === "ANNULE" && <div className={`w-full p-[5px] rounded-full bg-red-500`} />}
                    {retour?.statutRetour === "EN_ATTENTE" && <div className={`w-full p-[5px] rounded-full bg-gris-6`} />}
                </div>
                <div className="w-full flex flex-col gap-1">
                    <span className="text-left text-base text-gris-12 font-bold max-xs:text-sm">{statutRetourLisible(retour?.statutRetour || "")}</span>
                    <span className="text-gris-8 text-sm font-semibold max-[320px]:!text-xs">{new Date(retour?.dateModificationRetour || "").toLocaleDateString()}</span>
                </div>                
            </div>
            <hr className="w-full border border-gris-6" />
            <div className="w-full flex flex-col items-start justify-start gap-2">
                <span className="text-left text-base text-gris-12 font-bold max-xs:text-sm">Commande concernée</span>
                <div className="mt-4 w-full flex flex-col items-center justify-center gap-4">
                <div className="w-full flex items-center justify-between max-sm:w-full">
                    <span className="text-left text-base text-gris-8 font-semibold max-xs:text-sm">Numero de commende</span>
                    <span className="text-left text-base text-red-8 font-bold max-xs:text-sm">{commande?.numeroCommande.toUpperCase()}</span>
                </div>
                <div className="w-full flex items-center justify-between max-sm:w-full">
                    <span className="text-left text-base text-gris-8 font-bold max-xs:text-sm">Date de commande</span>
                    <span className="text-left text-base text-red-8 font-bold max-xs:text-sm">{new Date(commande?.dateCreationCommande || "").toLocaleDateString()}</span>
                </div>
                <div className="w-full flex items-center justify-between max-sm:w-full">
                    <span className="text-left text-base text-gris-8 font-bold max-xs:text-sm">Total</span>
                    <span className="text-left text-base text-red-8 font-bold max-xs:text-sm">{commande?.montantTotal?.toLocaleString()} FCFA</span>
                </div>
            </div>
            </div>
            <hr className="w-full border border-gris-6" />            
            <div className="w-full flex flex-col items-start justify-start gap-4">
                <span className="text-left text-base text-gris-12 font-bold max-xs:text-sm">Article concerné</span>
                {
                    <RetourArticleCard                            
                        ligne={{
                            idLigne: ligneCommande?.idLigne,
                            quantiteLigne: ligneCommande?.quantiteLigne || 1,
                            prixUnitaire: ligneCommande?.prixUnitaire || 0,
                            prixTotal: ligneCommande?.prixTotal || 0,
                            article: {
                                imageVariante: ligneCommande?.article.imageVariante || "",
                                valeursOption: ligneCommande?.article.valeursOption || [],
                                article: {
                                    nomArticle: ligneCommande?.article.article.nomArticle || "",
                                    imagesArticle: ligneCommande?.article.article.imagesArticle || [{urlImage: ""}],
                                    categorie: {
                                        libelleCategorie: ligneCommande?.article.article.categorie.libelleCategorie || ""
                                    }
                                }
                            },

                        }}
                    />                    
                }
            </div>
        </div>
    )
}

export default RetourDetail
