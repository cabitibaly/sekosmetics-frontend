import Link from 'next/link'
import React from 'react'
import MarqueCard from '../cards/marqueCard'

const MarqueSection = () => {
    return (
        <section className="px-[150px] py-8 w-screen flex flex-col items-center justify-start gap-4 max-2xl:px-[100px] max-xl:px-[60px] max-xl:py-4 max-896:!px-4">
            <div className="w-full flex items-center justify-between">
                <span className="span-font-size font-jura text-gris-12 font-bold max-sm:!text-2xl max-xs:!text-lg">Nos Marques</span>
                <Link href={"/marques"} className="link-voir-plus font-jura text-red-8 font-bold max-sm:!text-lg max-xs:!text-sm">Voir plus</Link>
            </div>
            <div className='w-full carousel carousel-center items-start space-x-6 max-896:space-x-4'>
                <MarqueCard 
                    id={1}
                    intitule={"Zaron"}
                    image={"/Zaron.webp"}
                />
                <MarqueCard 
                    id={2}
                    intitule={"Blossom Makeup"}
                    image={"/image-5.jpg"}
                />
                <MarqueCard 
                    id={3}
                    intitule={"Face facts"}
                    image={"/image.jpg"}
                />
                <MarqueCard 
                    id={4}
                    intitule={"Vee beauty"}
                    image={"/image-1.jpg"}
                />
                <MarqueCard 
                    id={5}
                    intitule={"Adventure Makeup"}
                    image={"/image-2.jpg"}
                />
                <MarqueCard 
                    id={6}
                    intitule={"Metics"}
                    image={"/image-3.jpg"}
                />
                <MarqueCard 
                    id={4}
                    intitule={"Vee beauty"}
                    image={"/image-1.jpg"}
                />
                <MarqueCard 
                    id={5}
                    intitule={"Adventure Makeup"}
                    image={"/image-2.jpg"}
                />
                <MarqueCard 
                    id={6}
                    intitule={"Metics"}
                    image={"/image-3.jpg"}
                />
            </div>
        </section>
    )
}

export default MarqueSection
