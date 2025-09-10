"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import MarqueCard from '../cards/marqueCard'
import { useGetLesMarques } from '@/hooks/marque-fetch/maqueFetch'
import { MoonLoader } from 'react-spinners'
import { useDebounce } from '@/hooks/useDebounce'

const MarqueBody = () => {
    const [recherche, setRecherche] = useState<string>("");
    const debouceValue = useDebounce(recherche, 500);
    const { marques, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetLesMarques(8, debouceValue.trim() || "");

    return (
        <div className="overflow-x-hidden px-[150px] py-12 w-screen min-h-screen flex flex-col items-center justify-start gap-12 max-2xl:px-[100px] max-xl:px-[60px] max-lg:py-8 max-896:!px-4 max-896:!pt-20 max-896:!pb-36 max-md:gap-6">
            <div className="w-3/5 flex items-center max-896:w-4/5 max-sm:w-full">   
                <label htmlFor="recherche-marque" className="sr-only">Recherche</label>
                <div className="relative w-full flex items-center justify-center">
                    <div className="size-5 absolute inset-y-2.5 start-1 flex items-center ps-12 pointer-events-none max-896:size-4 max-896:ps-10 max-896:inset-y-2">
                        <Image src={"/search.svg"} fill alt={"recherche"} />
                    </div>
                    <input value={recherche} onChange={e => setRecherche(e.target.value)} id="recherche-marque" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-12 p-1.5 placeholder:text-gris-6 max-896:text-sm max-896:ps-11" placeholder="Rechercher une marque..." />
                </div>
            </div>

            {
                isLoading &&
                    <div className='w-full h-64 flex items-center justify-center'>
                        <MoonLoader                                  
                            color="#FF7993"
                            size={24}
                        />
                    </div>
            }

            {       
                (marques.length > 0 && !isLoading) &&
                    <div className="w-full grid grid-cols-6 items-start justify-center gap-16 max-lg:gap-12 max-896:!gap-8 max-md:grid-cols-4 max-md:!gap-16 max-sm:!gap-8 max-xs:!gap-4">
                        {
                            marques.map((marque, index) => {
                                if(index <= 8) {
                                    return (
                                        <MarqueCard 
                                            key={marque.idMarque}
                                            id={marque.idMarque}
                                            intitule={marque.libelleMarque}
                                            image={marque.imgMarque}
                                        />
                                    )
                                }
                            })
                        }
                    </div>
            }

            {
                marques.length === 0 && !isLoading && (
                    <div className='w-full h-64 flex items-center justify-center'>
                        <p className='text-gris-12'>Aucune marque</p>
                    </div>
                )
            }

            {    
                hasNextPage &&
                <div className="w-full flex items-center justify-center">
                    <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className={`rounded-full font-bold bg-red-8 flex items-center justify-center text-gris-12 text-lg py-1.5 px-3 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-lg:text-base`}>
                        Charger plus
                    </button>
                </div>
            }
        </div>
    )
}

export default MarqueBody
