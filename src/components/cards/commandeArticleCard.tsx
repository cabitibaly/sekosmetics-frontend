import { LigneCommande } from "@/types/commandeField"
import { Dot } from "lucide-react"
import Image from "next/image"

interface CommandeArticleCardProps {
    ligne: LigneCommande,
    setLigneId: React.Dispatch<React.SetStateAction<number | null>>,
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    date: string | null,
    statutCommande: string
}

const CommandeArticleCard = ({  ligne, setLigneId, isModalOpen, setIsModalOpen, date, statutCommande }: CommandeArticleCardProps) => {    


    const isDateValide = (date: string | null) => {
        if (!date) return false

        const dateLivraison = new Date(date)
        const dateLimite = new Date(dateLivraison)
        dateLimite.setDate(dateLivraison.getDate() + 7)

        return new Date() <= dateLimite
    }

    const handleClick = () => {

        if(statutCommande !== "LIVREE") return
        if(!isDateValide(date)) return              

        setLigneId(ligne.idLigne || null)
        setIsModalOpen(!isModalOpen)
    }    

    return (
        <div onClick={() => handleClick()} className="relative border border-red-6 p-4 cursor-pointer rounded-3xl w-full flex items-center justify-between gap-4 transition duration-300 ease-in-out hover:border-red-8 hover:bg-red-2 max-896:p-2 max-sm:rounded-xl">
            <div className="flex items-center justify-start gap-4">
                {
                    ligne.article.article.imagesArticle[0]?.urlImage ?
                        <div className="relative size-32 rounded-3xl aspect-square max-896:size-24 max-896:rounded-2xl max-sm:size-16 max-sm:rounded-xl">
                            <Image src={ligne.article.article.imagesArticle[0].urlImage} fill alt="article" className="rounded-3xl max-896:rounded-2xl max-sm:rounded-xl" />
                        </div>
                    :
                        <div className="relative size-32 bg-red-6 text-red-1 text-base rounded-3xl aspect-square max-896:size-24 max-896:rounded-2xl max-sm:size-16 max-sm:rounded-xl">
                            <span>{ligne.article.article.nomArticle.charAt(0)}</span>
                        </div>
                }                
                <div className="flex flex-col items-start justify-center gap-1">
                    <div className="w-full line-clamp-2 text-base text-gris-12 font-bold max-sm:text-xs">
                        {ligne.article.article.nomArticle}
                    </div>
                    <div className="line-clamp-2 text-base text-red-8 font-bold max-sm:text-xs">{ligne.prixUnitaire.toLocaleString()} FCFA</div>
                    <div className="line-clamp-2 text-base text-gris-12 font-bold flex items-center justify-center gap-1 max-sm:text-xs">
                        <span className="text-gris-8">{ligne.article.valeursOption.map(valeur => valeur.valeurOption).join(", ")}</span>
                        <div>
                            <Dot className="stroke-gris-8 size-6 max-sm:size-4" />
                        </div>
                        <span>Qté : {ligne.quantiteLigne}</span>
                    </div>
                </div>
            </div>

            {
                isDateValide(date) && statutCommande == "LIVREE" &&
                <div className={`absolute -top-2 -right-0 px-1 py-0.5 rounded-sm text-xs bg-red-8 max-896:-top-3`}>
                    Retourner
                </div>
            }
        </div>
    )
}

export default CommandeArticleCard
