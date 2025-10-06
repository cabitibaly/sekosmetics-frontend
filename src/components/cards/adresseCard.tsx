
interface Props {
    index: number,
    id: number
    pays: string
    ville: string
    commune: string
    quartier: string
    estParDefaut: number | null
    setEstParDefaut: (estParDefaut: number) => void
}

const AdresseCard = ({index, id, pays, ville, commune, quartier, estParDefaut, setEstParDefaut}: Props) => {    

    return (
        <div className="relative w-full flex items-center justify-center group"> 
            <input id={`adresse-${id}`} checked={estParDefaut === id} onChange={() => setEstParDefaut(id)} type="radio" name="radio-5" className="absolute top-5 left-5 radio bg-transparent border-red-4 peer checked:bg-transparent checked:border-red-6 checked:text-red-8 max-896:radio-sm" />                                                  
            <label htmlFor={`adresse-${id}`} className="cursor-pointer border border-red-4 py-4 pl-14 pr-5 rounded-3xl w-full flex flex-col gap-1 transition duration-300 ease-in-out group-hover:border-red-6 peer-checked:border-red-6">
                <span className="text-lg text-gris-12 font-medium max-896:text-base">Adresse {index + 1}</span>
                <div className="w-full flex flex-col">
                    <span className="text-base text-gris-8 font-medium max-896:text-sm">{pays}</span>
                    <span className="text-base text-gris-8 font-medium max-896:text-sm">{ville}</span>
                    <span className="text-base text-gris-8 font-medium max-896:text-sm">{commune}</span>
                    <span className="text-base text-gris-8 font-medium max-896:text-sm">{quartier}</span>
                </div>
            </label>                 
        </div>        
    )
}

export default AdresseCard
