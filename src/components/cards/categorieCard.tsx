import { CommonType } from "@/types/commonType"
import Image from "next/image"
import Link from "next/link"

const CategorieCard = ({id, intitule, image, inCarrousel = false}: CommonType) => {
    return (
        <Link 
            href={`/categories/${id}`} 
            className={`border border-red-4 rounded-3xl carousel-item items-center justify-start flex-col max-md:rounded-2xl
                ${
                    inCarrousel ? "w-[180px] h-[278px] max-lg:h-[210px] max-lg:w-[120px] max-896:w-[194px] max-md:h-[158px] max-md:w-[100px] max-md:rounded-2xl max-xs:h-[130px] max-xs:w-[80px]" :
                    "w-full h-full  max-sm:w-[100%] max-sm:h-full"
                }
            `}
        >
            <div className="w-full aspect-square relative rounded-3xl flex items-center justify-center max-md:rounded-2xl">
                <Image src={image} fill alt='Zaron' className='rounded-3xl max-md:rounded-2xl' />
            </div>
            <div className={`px-2 py-4 w-full h-full flex items-center justify-center ${inCarrousel ? "max-md:py-2": "max-md:py-6"}`}>
                <p className={`line-clamp-2 text-2xl text-gris-12 font-bold text-center max-lg:text-xl ${inCarrousel ? "max-896:!text-sm max-xs:!text-xs" : "max-md:!text-base"}`}>{intitule}</p>
            </div>
        </Link>
    )
}

export default CategorieCard
