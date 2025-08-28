import { useMemo, useRef, useState } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside';
import { useGetPays } from '@/hooks/usePays';
import { ChevronDown } from 'lucide-react';
import type { Country } from '@/types/countryField';
import Image from 'next/image';
import { MoonLoader } from 'react-spinners';

interface Props {
    setCountrySelcted: React.Dispatch<React.SetStateAction<Country | null>>
}

const DropdownPays = ({setCountrySelcted}: Props) => {
    const { countries, isLoading } = useGetPays()
    const [isOpen, setIsOpen] = useState(false); 
    const [pays, setPays] = useState<Country | null>(null) 
    const [recherche, setRecherche] = useState<string>("Cote d\'ivoire")
    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => setIsOpen(false), isOpen);

    const normalizeString = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };
    
    const filteredCountries = useMemo(() => {
        return countries.filter((country) =>
            normalizeString(country.nameFr).includes(normalizeString(recherche))
        );
    }, [countries, recherche]);

    const handleChangePays = (country: Country) => {
        setPays(country);
        setIsOpen(!isOpen);
        setCountrySelcted(country);
        setRecherche("");
    }

    return (
        <div ref={ref} onClick={() => setIsOpen(!isOpen)} className={`relative border border-red-4 py-2 px-3 rounded-full w-full flex items-center justify-start ${!pays ? "h-[50px]" : ""}`}>
                <div className={` w-full flex items-center justify-between gap-4`}>
                    {
                        pays ?
                            <>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="relative size-7 aspect-square rounded-full flex items-center justify-center">                                        
                                        <Image src={pays?.flag} fill alt={pays?.nameFr} className='object-cover aspect-square rounded-full' />
                                    </div>
                                    <span className="text-lg text-gris-12 font-normal max-896:text-sm">{pays?.nameFr}</span>
                                </div>                                
                            </> 
                        :
                            <div className="cursor-default text-lg text-red-6 font-normal line-clamp-1">Sélectionnez un pays</div>
                    } 
                    <div className={`size-6 flex items-center justify-center transition duration-200 ${isOpen ? "rotate-180" : ""}`}>
                        <ChevronDown className="stroke-red-8 size-6 aspect-square" />
                    </div>                         
                </div>
                {    
                    isOpen &&
                    <div onClick={e => e.stopPropagation()} className="absolute left-0 overflow-auto z-50 top-full border border-red-6 bg-red-1 rounded-3xl w-full h-64 flex-col items-start justify-start max-sm:w-full">                    
                        <div className="px-4 pt-4 pb-2 w-full flex items-center justify-start gap-2">
                            <input value={recherche} onChange={e => setRecherche(e.target.value)} type="text" className="border border-gris-6 p-2 rounded-2xl w-full text-base text-gris-12 font-normal focus:outline-none focus:border-red-6 focus:ring-red-6" placeholder="Rechercher un pays..." />
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
                            filteredCountries.map((country, index) => (
                                <div key={index} onClick={() => handleChangePays(country)} className="p-4 cursor-pointer w-full flex items-center justify-start gap-2 hover:bg-gris-4">
                                    <div className="relative size-7 aspect-square rounded-full flex items-center justify-center">
                                        <Image src={country.flag} alt={country.nameFr} fill className="size-full object-cover aspect-square rounded-full" />
                                    </div>
                                    <span className="text-lg text-gris-12 font-normal max-896:text-sm">{country.nameFr}</span>
                                </div>
                            ))
                        }

                        {
                            !isLoading && filteredCountries.length === 0 &&
                            <div className="w-full h-full text-gris-12 flex items-center justify-center">
                                Aucune ville trouvée
                            </div>
                        }
                    </div>
                }
            </div>
    )
}

export default DropdownPays
