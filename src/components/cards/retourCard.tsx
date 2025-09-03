import { Check, ChevronRight, X } from "lucide-react"

interface Props {
    id: number,
    numero: string,
    statut: string,
    date: string,
    setRetour: (id: number | null) => void,
}

const RetourCard = ({id, numero, statut, date, setRetour}: Props) => {

    const handleClick = () => {        
        setRetour(id)
    }

    return (
        <div onClick={() => handleClick()} className="cursor-pointer border border-red-3 p-3 rounded-2xl bg-red-2/20 w-full flex flex-col items-start justify-start gap-2 group transition duration-200 ease-in hover:bg-red-2/60 hover:border-red-4">
            <div className="w-full flex items-center justify-between gap-4">
                <span className="text-gris-8 text-lg font-semibold max-sm:text-sm max-[320px]:!text-xs">Numero de retour</span>
                <span className="text-gris-12 text-lg font-semibold max-sm:text-sm max-xs:!text-xs">{numero}</span>
            </div>
            <div className="w-full flex items-center justify-between gap-4">
                <div className="flex items-center justify-center gap-4">
                    <div className="size-16 rounded-full bg-gris-3 flex items-center justify-center max-sm:size-12">                        
                        {statut === "APPROUVE" && <Check className="stroke-gris-12 size-8 max-sm:size-6" />}
                        {statut === "ANNULE" && <X className="stroke-gris-12 size-8 max-sm:size-6" />}
                    </div>
                    <div className="flex flex-col items-start justify-center gap-2">
                        <span className="text-gris-12 text-lg font-semibold max-sm:text-sm max-[320px]:!text-xs">
                            {statut === "APPROUVE" && "Approuvé"}
                            {statut === "ANNULE" && "Annulé"}
                        </span>
                        <span className="text-gris-8 text-sm font-semibold max-[320px]:!text-xs">{date}</span>
                    </div>
                </div>
                <div className="cursor-pointer transition duration-200 ease-in-out group-hover:translate-x-2">
                    <ChevronRight strokeWidth={1.5} className="stroke-red-8 size-12 max-sm:size-8" />
                </div>
            </div> 
        </div>
    )
}

export default RetourCard
