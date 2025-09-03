"use client"

import { X } from "lucide-react"
import DropdownCategorie from "../dropdown/dropdownCategorie"
import DropdownMarque from "../dropdown/dropdownMarque"

interface Props {
    isModalOpen: boolean
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    categorieId: string | undefined
    setCategorieId: React.Dispatch<React.SetStateAction<string | undefined>>
    marqueId: string | undefined
    setMarqueId: React.Dispatch<React.SetStateAction<string | undefined>>
    prixMin: string
    setPrixMin: React.Dispatch<React.SetStateAction<string>>
    prixMax: string
    setPrixMax: React.Dispatch<React.SetStateAction<string>>
    refetchArticles: () => void,    
}

const FilterModal = ({
    isModalOpen, 
    setIsModalOpen, 
    categorieId, 
    setCategorieId, 
    marqueId, 
    setMarqueId, 
    prixMin, 
    setPrixMin, 
    prixMax, 
    setPrixMax, 
    refetchArticles,      
}: Props) => {

    const handleReset = () => {
        setCategorieId?.(undefined);
        setMarqueId?.(undefined);        
        setPrixMin("");
        setPrixMax("");
        setIsModalOpen(false);
    }

    return (
        <div onClick={() => setIsModalOpen(!isModalOpen)} className='fixed top-0 left-0 z-50 bg-gris-12/60 w-full h-full flex items-center justify-end'>
            <div onClick={e => e.stopPropagation()} className='relative py-8 w-2/5 bg-red-1 h-full flex flex-col items-center justify-start gap-8 max-xl:w-3/5 max-md:w-full'>
                <div className='px-8 w-full flex items-center justify-between gap-4'>
                    <span className='text-4xl text-gris-12 font-medium max-lg:text-2xl'>Filtre</span>
                    <button type='button' onClick={() => setIsModalOpen(!isModalOpen)} className='cursor-pointer'>
                        <X strokeWidth={1.5} className='stroke-gris-12 size-10 max-lg:size-8' />
                    </button>
                </div>
                <div className='px-8 w-full flex flex-col items-start justify-start gap-4'>
                    <span className='text-2xl text-gris-12 font-bold max-lg:text-xl'>Catégorie</span>
                    <DropdownCategorie categorieId={categorieId} setCategorieId={setCategorieId} />
                </div>
                <div className='px-8 w-full flex flex-col items-start justify-start gap-4'>
                    <span className='text-2xl text-gris-12 font-bold max-lg:text-xl'>Marque</span>
                    <DropdownMarque marqueId={marqueId} setMarqueId={setMarqueId} />
                </div>
                <div className='px-8 w-full flex items-start justify-between gap-8 max-xs:flex-col max-xs:gap-6'>
                    <div className='w-1/2 flex flex-col items-start justify-start gap-4 max-xs:w-full max-xs:gap-2.5'>
                        <span className='text-2xl text-gris-12 font-bold max-lg:text-xl'>Prix Minimum</span>
                        <input value={prixMin} onChange={e => setPrixMin(e.target.value)} type="text" className="border border-red-6 p-2 rounded-full w-full text-lg text-gris-12 font-normal focus:outline-none focus:border-red-6 focus:ring-red-6 max-lg:text-base" placeholder="Prix Minimum..." />
                    </div>
                    <div className='w-1/2 flex flex-col items-start justify-start gap-4 max-xs:w-full max-xs:gap-2.5'>
                        <span className='text-2xl text-gris-12 font-bold max-lg:text-xl'>Prix Maximum</span>
                        <input value={prixMax} onChange={e => setPrixMax(e.target.value)} type="text" className="border border-red-6 p-2 rounded-full w-full text-lg text-gris-12 font-normal focus:outline-none focus:border-red-6 focus:ring-red-6 max-lg:text-base" placeholder="Prix Maximum..." />
                    </div>
                </div>
                <div className='absolute bottom-8 left-0 px-8 w-full flex items-center justify-between gap-4'>
                    <button onClick={() => handleReset()} className={`rounded-full font-bold bg-red-2 flex items-center justify-center text-gris-12 text-lg w-1/2 py-1 px-4 cursor-pointer ease-in-out transition duration-300 border border-red-3 hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-lg:text-`}>
                        Réinitialiser
                    </button>
                    <button onClick={() => {refetchArticles(); setIsModalOpen(false)}} className={`rounded-full font-bold bg-red-8 flex items-center justify-center text-gris-12 text-lg w-1/2 py-1 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-lg:text-`}>
                        Appliquer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FilterModal
