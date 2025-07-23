import { CommonType } from '@/types/commonType'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const MarqueCard = ({id, intitule, image}: CommonType) => {
    return (
        <Link href={`/marques/${id}`} className="carousel-item w-[180px] items-center justify-center flex-col gap-4 max-lg:gap-2 max-lg:w-[120px] max-md:w-[100px] max-xs:w-[80px]">
            <div className='border-2 border-red-6 rounded-full p-1 w-full aspect-square'>
                <div className='z-0 relative w-full h-full flex items-center justify-center rounded-full'>
                    <Image src={image} fill alt='Zaron' className='rounded-full' />
                </div>
            </div>
            <p className='line-clamp-2 text-2xl text-gris-12 font-bold text-center max-lg:text-xl max-896:!text-sm'>{intitule}</p>
        </Link>
    )
}

export default MarqueCard
