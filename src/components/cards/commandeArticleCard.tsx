import { LigneCommande } from "@/types/commandeField"
import { Dot } from "lucide-react"
import Image from "next/image"

const CommandeArticleCard = ({ligne}: {ligne: LigneCommande}) => {
    return (
        <div className="relative border border-red-6 p-4 rounded-3xl w-full flex items-center justify-between gap-4 max-896:p-2 max-sm:rounded-xl">
            <div className="flex items-center justify-start gap-4">
                <div className="relative size-32 rounded-3xl aspect-square max-896:size-24 max-896:rounded-2xl max-sm:size-16 max-sm:rounded-xl">
                    <Image src={ligne.article.article.imagesArticle[0].urlImage} fill alt="article" className="rounded-3xl max-896:rounded-2xl max-sm:rounded-xl" />
                </div>
                <div className="flex flex-col items-start justify-center gap-1">
                    <div className="w-full line-clamp-2 text-base text-gris-12 font-bold max-sm:text-xs">
                        {ligne.article.article.nomArticle}
                    </div>
                    <div className="line-clamp-2 text-base text-red-8 font-bold max-sm:text-xs">{ligne.prixUnitaire} FCFA</div>
                    <div className="line-clamp-2 text-base text-gris-12 font-bold flex items-center justify-center gap-1 max-sm:text-xs">
                        <span className="text-gris-8">{ligne.article.valeursOption.map(valeur => valeur.valeurOption).join(", ")}</span>
                        <div>
                            <Dot className="stroke-gris-8 size-6 max-sm:size-4" />
                        </div>
                        <span>Quantité : {ligne.quantiteLigne}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommandeArticleCard
