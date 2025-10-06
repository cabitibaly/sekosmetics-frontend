"use client"
import Link from 'next/link'
import React from 'react'
import CategorieCard from '../cards/categorieCard'
import { MoonLoader } from 'react-spinners'
import { useGetLesCategoriesPagine } from '@/hooks/categorie-fetch/categorieFetch'

const CategorieSection = () => {
    const { categories, isLoading } = useGetLesCategoriesPagine(8);

    return (
        <section className="overflow-x-hidden px-[150px] py-6 w-screen flex flex-col items-center justify-start gap-4 max-2xl:px-[100px] max-xl:px-[60px] max-xl:py-2 max-896:!px-4">
            <div className="w-full flex items-center justify-between">
                <span className="span-font-size text-gris-12 font-bold max-sm:!text-2xl max-xs:!text-lg">Nos Categories</span>
                <Link href={"/categories"} className="link-voir-plus text-red-8 font-bold max-sm:!text-lg max-xs:!text-sm">Voir plus</Link>
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
                (categories.length > 0 && !isLoading) &&
                    <div className='w-full carousel carousel-center items-start space-x-6 max-896:space-x-4'>
                        {
                            categories.map((categories, index) => {
                                if(index <= 8) {
                                    return (
                                        <CategorieCard
                                            key={categories.idCategorie}
                                            id={categories.idCategorie}
                                            intitule={categories.libelleCategorie}
                                            image={categories.imgCategorie}
                                            inCarrousel={true}
                                        />
                                    )
                                }
                            })
                        }                       
                    </div>
            }
            {
                categories.length === 0 && !isLoading && (
                    <div className='w-full h-64 flex items-center justify-center'>
                        <p className='text-gris-12'>Aucune catégorie</p>
                    </div>
                )
            }
        </section>
    )
}

export default CategorieSection
