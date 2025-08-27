import Image from "next/image"

interface Props {
    id: number,
    intitule: string,
    image: string,
    prix: number,
    handleClick: (id: number) => void,
    estSelected?: boolean
}

const VarianteCard = ({id, intitule, image, prix, handleClick, estSelected = false}: Props) => {

    return (
        <div onClick={() => handleClick(id)} className={`border w-[100px] !h-[98%] relative rounded-2xl carousel-item flex-col items-start justify-center max-lg:!h-[170px] max-xs:!h-[150px] max-xs:w-[80px] transition duration-300 ease-in-out ${estSelected ? "border-red-8" : "border-red-4"}`}>
            <div className="w-full aspect-square relative rounded-2xl flex items-center justify-center">
                <Image src={image} fill alt='Beauty planet' className='rounded-2xl' />
            </div>
            <div className="px-2 py-2 w-full h-full flex flex-col items-start justify-center gap-1 max-xs:px-0.5">
                <div className="w-full line-clamp-2 text-xs text-gris-12 font-semibold max-xs:text-center">
                    {intitule}
                </div>                
                <div className="w-full text-red-8 text-xs text-left font-bold max-xs:text-center">{prix.toLocaleString("fr-FR")} F</div>                
            </div>
        </div>
    )
}

export default VarianteCard
