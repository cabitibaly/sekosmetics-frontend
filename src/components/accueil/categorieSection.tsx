import Link from 'next/link'
import React from 'react'
import CategorieCard from '../cards/categorieCard'

const CategorieSection = () => {
    return (
        <section className="px-[150px] py-6 w-screen flex flex-col items-center justify-start gap-4 max-2xl:px-[100px] max-xl:px-[60px] max-xl:py-2 max-896:!px-4">
            <div className="w-full flex items-center justify-between">
                <span className="span-font-size font-jura text-gris-12 font-bold max-sm:!text-2xl max-xs:!text-lg">Nos Categories</span>
                <Link href={"/categories"} className="link-voir-plus font-jura text-red-8 font-bold max-sm:!text-lg max-xs:!text-sm">Voir plus</Link>
            </div>
            <div className='w-full carousel carousel-center items-start space-x-6 max-896:space-x-4'>
                <CategorieCard 
                    id={1}
                    intitule='Poudre de finition'
                    image={"/image-6.jpg"}
                />
                <CategorieCard 
                    id={2}
                    intitule='Lips'
                    image={"/image-11.jpg"}
                />
                <CategorieCard 
                    id={3}
                    intitule='Makeup tools'
                    image={"/image-10.jpg"}
                />
                <CategorieCard 
                    id={4}
                    intitule='Face'
                    image={"/image-9.jpg"}
                />
                <CategorieCard 
                    id={5}
                    intitule='Poudre libre'
                    image={"/image-8.jpg"}
                />
                <CategorieCard 
                    id={6}
                    intitule='Sourcils'
                    image={"/image-7.jpg"}
                />
                <CategorieCard 
                    id={3}
                    intitule='Makeup tools'
                    image={"/image-10.jpg"}
                />
                <CategorieCard 
                    id={4}
                    intitule='Face'
                    image={"/image-9.jpg"}
                />
                <CategorieCard 
                    id={5}
                    intitule='Poudre libre'
                    image={"/image-8.jpg"}
                />
                <CategorieCard 
                    id={6}
                    intitule='Sourcils'
                    image={"/image-7.jpg"}
                />
            </div>
        </section>
    )
}

export default CategorieSection
