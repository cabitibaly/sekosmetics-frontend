import { Plus } from "lucide-react"
import Image from "next/image"

interface Props {
    id: number,
    intitule: string,
    image: string
    setCategory: (categorie: number) => void,     
}

const KitCategorieCard = ({id, intitule, image, setCategory}: Props) => {

    const handleClick = () => {        
        setCategory(id)
    }


    return (
        <div onClick={() => handleClick()} className="cursor-pointer group border border-red-4 rounded-3xl w-full h-full flex flex-col items-center justify-start gap-3 transition duration-200 ease-in-out hover:border-red-6">
            <div className="relative aspect-square w-full flex items-center justify-center">
                <Image src={image} fill alt="kit" className="rounded-3xl" />
            </div>
            <div className="overflow-hidden px-2 pb-2 w-full h-full flex flex-col items-start justify-between gap-2">
                <p className={`line-clamp-2 text-xl text-gris-12 font-bold text-start max-xl:text-base max-sm:text-sm`}>{intitule}</p>
                <div className="self-end size-10 rounded-xl bg-red-8 flex items-center justify-center cursor-pointer transition duration-150 ease-in group-hover:-translate-y-1 max-xl:size-8">
                    <Plus className="stroke-gris-12 size-6 max-xl:size-5" />
                </div>
            </div>                        
        </div>
    )
}

export default KitCategorieCard
