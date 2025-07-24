import Image from 'next/image'
import React from 'react'
import MarqueCard from '../cards/marqueCard'

const MarqueBody = () => {
    return (
        <div className="overflow-x-hidden px-[150px] py-12 w-screen min-h-screen flex flex-col items-center justify-start gap-12 max-2xl:px-[100px] max-xl:px-[60px] max-lg:py-8 max-896:!px-4 max-896:!pt-20 max-896:!pb-36 max-md:gap-6">
                <div className="w-3/5 flex items-center max-896:w-4/5 max-sm:w-full">   
                    <label htmlFor="recherche-marque" className="sr-only">Recherche</label>
                    <div className="relative w-full flex items-center justify-center">
                        <div className="size-5 absolute inset-y-2.5 start-1 flex items-center ps-12 pointer-events-none max-896:size-4 max-896:ps-10 max-896:inset-y-2">
                            <Image src={"/search.svg"} fill alt={"recherche"} />
                        </div>
                        <input id="recherche-marque" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-12 p-1.5 placeholder:text-gris-6 max-896:text-sm max-896:ps-11" placeholder="Rechercher une marque..." />
                    </div>
                </div>
                <div className="w-full grid grid-cols-6 items-start justify-center gap-16 max-lg:gap-12 max-896:!gap-8 max-md:grid-cols-4 max-md:!gap-16 max-sm:!gap-8 max-xs:!gap-4">
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
        </div>
    )
}

export default MarqueBody
