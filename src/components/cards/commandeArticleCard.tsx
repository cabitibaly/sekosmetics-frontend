import Image from "next/image"

const CommandeArticleCard = () => {
    return (
        <div className="relative border border-red-6 p-4 rounded-3xl w-full flex items-center justify-between gap-4 max-896:p-2 max-sm:rounded-xl">
            <div className="flex items-center justify-start gap-4">
                <div className="relative size-32 rounded-3xl aspect-square max-896:size-24 max-896:rounded-2xl max-sm:size-16 max-sm:rounded-xl">
                    <Image src={"/image-16.jpg"} fill alt="panier" className="rounded-3xl max-896:rounded-2xl max-sm:rounded-xl" />
                </div>
                <div className="flex flex-col items-start justify-center gap-1">
                    <div className="w-full line-clamp-2 text-base text-gris-12 font-bold max-sm:text-xs">
                        Beauty Planet 15-Piece Professional brush
                    </div>
                    <div className="line-clamp-2 text-base text-red-8 font-bold max-sm:text-xs">10 000 FCFA</div>
                    <div className="line-clamp-2 text-base text-gris-12 font-bold max-sm:text-xs">
                        Quantité : 1
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommandeArticleCard
