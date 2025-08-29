import { useKit } from "@/hooks/useKit"
import { TrashIcon } from "lucide-react"
import Image from "next/image"

interface Props {
    id: number,
}

const KitCard = ({id}: Props) => {
    const { supprimerLigneKit, kit } = useKit()
    const article = kit.find(a => a.articleId === Number(id))

    return (
        <div className="relative border border-red-6 p-4 rounded-3xl w-[87%] carousel-item flex-col items-center justify-start gap-3 max-896:flex-row max-896:w-2/3 max-896:h-auto max-xs:w-[88%]">
            <div className="relative w-full aspect-square flex items-center justify-center rounded-3xl max-896:size-full">
                <Image src={article?.image as string} fill alt="kit" className="rounded-3xl" />                
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-4">
                <p className="line-clamp-2 text-2xl text-gris-12 font-semibold text-left max-xl:text-xl max-lg:text-base max-896:!text-xl max-sm:!text-lg max-xs:!text-base max-[360px]:!text-xs">
                    {article?.nomArticle}
                </p>
                <span className="text-red-8 text-2xl text-left font-bold max-xl:text-xl max-lg:text-base max-896:!text-xl max-sm:!text-lg max-xs:!text-base max-[360px]:!text-xs">
                    {article?.prixTotal.toLocaleString("fr-FR")} FCFA
                </span>
            </div>
            <button onClick={() => supprimerLigneKit(id)} className="cursor-pointer absolute -top-2 -right-2 size-7 rounded-full bg-red-8 flex items-center justify-center">
                <TrashIcon color="#1E1F24" className="size-5" />
            </button>
        </div>
    )
}

export default KitCard
