"use client"
import Link from 'next/link'
import React from 'react'
import MarqueCard from '../cards/marqueCard'
import { useGetLesMarques } from '@/hooks/marque-fetch/maqueFetch'
import { MoonLoader } from 'react-spinners'

const MarqueSection = () => {
    const { marques, isLoading } = useGetLesMarques()

    return (
        <section className="overflow-x-hidden px-[150px] py-8 w-screen flex flex-col items-center justify-start gap-4 max-2xl:px-[100px] max-xl:px-[60px] max-xl:py-4 max-896:!px-4">
            <div className="w-full flex items-center justify-between">
                <span className="span-font-size font-jura text-gris-12 font-bold max-sm:!text-2xl max-xs:!text-lg">Nos Marques</span>
                <Link href={"/marques"} className="link-voir-plus font-jura text-red-8 font-bold max-sm:!text-lg max-xs:!text-sm">Voir plus</Link>
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
                    <div className='w-full carousel carousel-center items-start space-x-6 max-896:space-x-4'>
                        {
                            marques.map((marque, index) => {
                                if(index <= 8) {
                                    return (
                                        <MarqueCard 
                                            key={marque.idMarque}
                                            id={marque.idMarque}
                                            intitule={marque.libelleMarque}
                                            image={marque.imgMarque}
                                            inCarrousel={true}
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
        </section>
    )
}

export default MarqueSection
