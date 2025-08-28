import { useMemo, useRef, useState } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside';
import { ChevronDown } from 'lucide-react';
import { useGetVille } from '../../hooks/usePays';
import { MoonLoader } from 'react-spinners';

interface Props {
    citySelected: React.Dispatch<React.SetStateAction<string>>
    pays: string;
}

const DropdownVille = ({citySelected, pays}: Props) => {
    const { villes, isLoading } = useGetVille(pays)
    const [isOpen, setIsOpen] = useState(false); 
    const [ville, setVille] = useState<string>("") 
    const [recherche, setRecherche] = useState<string>("")
    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => setIsOpen(false), isOpen);

    const normalizeString = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };
    
    const filteredCities = useMemo(() => {
        return villes.filter((ville) =>
            normalizeString(ville).includes(normalizeString(recherche))
        );
    }, [villes, recherche]);

    const handleChangePays = (city: string) => {
        setVille(city);
        setIsOpen(!isOpen);
        citySelected(city);
        setRecherche("");
    }

    return (
        <div ref={ref} onClick={() => setIsOpen(!isOpen)} className={`relative border border-red-4 bg-gris-1 py-2 px-3 rounded-full w-full flex items-center justify-start h-[50px]`}>
                <div className={`w-full flex items-center justify-between gap-4`}>
                    <div className={`cursor-default text-lg font-normal line-clamp-1 max-896:text-sm ${!ville ? "text-red-8" : "text-gris-12"}`}>
                        {ville ? ville : "Sélectionnez une ville"}
                    </div>
                    <div className={`size-6 flex items-center justify-center transition duration-200 ${isOpen ? "rotate-180" : ""}`}>
                        <ChevronDown className="stroke-red-8 size-6 aspect-square" />
                    </div>                         
                </div>
                {    
                    isOpen &&
                    <div onClick={e => e.stopPropagation()} className="absolute left-0 overflow-auto z-50 top-full border border-red-6 bg-red-1 rounded-3xl w-full h-64 flex-col items-start justify-start max-sm:w-full">                    
                        <div className="px-4 pt-4 pb-2 w-full flex items-center justify-start gap-2">
                            <input value={recherche} onChange={e => setRecherche(e.target.value)} type="text" className="border border-gris-6 p-2 rounded-2xl w-full text-base text-gris-12 font-normal focus:outline-none focus:border-red-6 focus:ring-red-6" placeholder="Rechercher une ville..." />
                        </div>
                        {
                            isLoading && 
                                <div className="w-full h-full text-gris-12 flex items-center justify-center">
                                    <MoonLoader
                                        color="#FF7993" 
                                        size={24} 
                                    />
                                </div>
                        }

                        {
                            !isLoading && filteredCities.length > 0 &&
                            filteredCities.map((city, index) => (
                                <div key={index} onClick={() => handleChangePays(city)} className=" p-4 cursor-pointer w-full flex items-center justify-start gap-2 hover:bg-gris-4">                                    
                                    <span className="text-lg text-gris-12 font-normal max-896:text-sm">{city}</span>
                                </div>
                            ))
                        }

                        {
                            !isLoading && filteredCities.length === 0 &&
                            <div className="w-full h-full text-gris-12 flex items-center justify-center">
                                Aucune ville trouvée
                            </div>
                        }
                    </div>
                }
            </div>
    )
}

export default DropdownVille
