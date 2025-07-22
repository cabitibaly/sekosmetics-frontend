import { ArticleCardType } from "@/types/articleCardType"
import Image from "next/image"
import Link from "next/link"

const ArticleCard = ({id, nom, image, prix, notaion, estFavori = false}: ArticleCardType) => {
    return (
        <Link href={`/article/${id}`} className="border border-red-4 relative rounded-3xl flex flex-col items-start justify-center">
            <div className="w-full aspect-square relative rounded-3xl flex items-center justify-center">
                <Image src={image} fill alt='Beauty planet' className='rounded-3xl' />
            </div>
            <div className="p-2.5 py-4 w-full h-full flex flex-col items-start justify-center gap-1">
                <p className="line-clamp-2 text-base text-gris-12 font-semibold text-left max-896:text-sm max-sm:text-xs">
                    {nom}
                </p>
                <div className="w-full flex items-center justify-between max-[360px]:flex-col max-[360px]:gap-2">
                    <span className="text-red-8 text-lg text-left font-bold max-md:text-sm">{prix.toLocaleString("fr-FR")} FCFA</span>
                    <div className="flex justify-center gap-1">
                        <div className="relative size-4 aspect-square flex items-center justify-center max-md:size-3">
                            <Image src={"/star.svg"} fill alt="star"/>                            
                        </div>
                        <span className="text-gris-12 text-sm font-bold max max-md:text-xs">{notaion}</span>
                    </div>
                </div>
            </div>
            <div className="z-10 absolute top-3 right-4 size-6 flex items-center justify-center cursor-pointer max-md:size-4">
                {
                    estFavori ?
                    <Image src={"/heart_active.svg"} fill alt="heart"/> :
                    <Image src={"/heart.svg"} fill alt="heart"/>
                }
            </div>
        </Link>
    )
}

export default ArticleCard
