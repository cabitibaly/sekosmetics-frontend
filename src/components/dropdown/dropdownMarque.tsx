import { useClickOutside } from '@/hooks/useClickOutside';
import { ChevronDown } from 'lucide-react';
import { MoonLoader } from 'react-spinners';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetLesMarques } from '@/hooks/marque-fetch/maqueFetch';
import { MarqueField } from '@/types/marqueField';

interface Props {
    setMarqueId: React.Dispatch<React.SetStateAction<string | undefined>>
    marqueId: string | undefined
}

const DropdownMarque = ({setMarqueId, marqueId}: Props) => {
    const [isOpen, setIsOpen] = useState(false); 
    const [marque, setMarque] = useState<MarqueField | null>(null)
    const [recherche, setRecherche] = useState<string>("")
    const debounceValue = useDebounce(recherche, 500);
    const ref = useRef<HTMLDivElement>(null);
    const { marques, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetLesMarques(8, debounceValue.trim() || "");    

    useClickOutside(ref, () => setIsOpen(false), isOpen);    

    useEffect(() => {
        if(marqueId === undefined) {                        
            setRecherche("");
            setMarque(null);
        } else {
            setMarque(marques.find(m => m.idMarque === Number(marqueId)) || null);
        }
    }, [marqueId, marques])

    const handleChangeMarque = (brand: MarqueField) => {
        setMarque(brand);
        setMarqueId(brand.idMarque.toString());
        setIsOpen(!isOpen);        
        setRecherche("");
    }

    return (
        <div ref={ref} onClick={() => setIsOpen(!isOpen)} className={`relative border border-red-4 py-2 px-3 rounded-full w-full flex items-center justify-start`}>
                <div className={` w-full flex items-center justify-between gap-4`}>
                    <div className={`cursor-default text-lg line-clamp-1 max-lg:text-base  ${marque ? "text-red-8 font-bold" : "text-red-6 font-normal"} `}>
                        {marque ? marque.libelleMarque : "Sélectionnez une marque"}
                    </div>                     
                    <div className={`size-6 flex items-center justify-center transition duration-200 ${isOpen ? "rotate-180" : ""}`}>
                        <ChevronDown className="stroke-red-8 size-6 aspect-square" />
                    </div>                         
                </div>
                {    
                    isOpen &&
                    <div onClick={e => e.stopPropagation()} className="absolute left-0 overflow-auto z-50 top-full border border-red-6 bg-red-1 rounded-3xl w-full h-64 flex-col items-start justify-start max-sm:w-full">                    
                        <div className="px-4 pt-4 pb-2 w-full flex items-center justify-start gap-2">
                            <input value={recherche} onChange={e => setRecherche(e.target.value)} type="text" className="border border-gris-6 p-2 rounded-2xl w-full text-base text-gris-12 font-normal focus:outline-none focus:border-red-6 focus:ring-red-6" placeholder="Rechercher une marque..." />
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
                            marques.map((marque, index) => (
                                <div key={index} onClick={() => handleChangeMarque(marque)} className="p-4 cursor-pointer w-full flex items-center justify-start gap-2 hover:bg-gris-4">
                                    <span className="text-lg text-gris-12 font-normal max-896:text-sm">{marque.libelleMarque}</span>
                                </div>
                            ))
                        }

                        {
                            !isLoading && marques.length === 0 &&
                            <div className="w-full h-full text-gris-12 flex items-center justify-center">
                                Aucune marque trouvée
                            </div>
                        }

                        {
                            hasNextPage &&
                            <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className="p-2 cursor-pointer w-full flex items-center justify-center text-base text-red-8 hover:underline">Afficher plus</button>
                        }
                    </div>
                }
        </div>
    )
}

export default DropdownMarque

