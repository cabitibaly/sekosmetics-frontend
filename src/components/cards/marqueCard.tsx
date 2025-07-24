import { CommonType } from '@/types/commonType'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const MarqueCard = ({id, intitule, image, inCarrousel = false}: CommonType) => {
    return (
        <Link 
            href={`/marques/${id}`} 
            className={`carousel-item items-center justify-center flex-col gap-4 
                ${inCarrousel ? "w-[180px] max-lg:gap-2 max-lg:w-[120px] max-md:w-[100px] max-xs:w-[80px]"
                : "w-full max-md:gap-2"}
            `}
        >
            <div className='border-2 border-red-6 rounded-full p-1 w-full aspect-square'>
                <div className='z-0 relative w-full h-full flex items-center justify-center rounded-full'>
                    <Image src={image} fill alt='Zaron' className='rounded-full' />
                </div>
            </div>
            <p className={`line-clamp-2 text-2xl text-gris-12 font-bold text-center ${inCarrousel ? "max-lg:text-xl max-896:!text-sm" : "max-xl:text-xl max-lg:text-base max-xs:text-xs"}`}>
                {intitule}
            </p>
        </Link>
    )
}

export default MarqueCard
