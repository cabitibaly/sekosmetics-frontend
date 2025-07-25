"use client"

import Image from "next/image"

const CommentaireCard = () => {
    return (
        <div className="w-full flex flex-col items-center-start justify-center gap-4">
            <div className="w-full flex items-center justify-between gap-4 max-xs:flex-col max-xs:items-start max-xs:gap-2">
                <div className="flex items-center justify-center gap-4">
                    <div className="relative size-12 rounded-full flex items-center justify-center max-lg:size-10">
                        <Image src={"/profil-1.jpg"} fill alt="profil" className="rounded-full" />
                    </div>
                    <span className="text-xl text-gris-12 font-bold text-center max-lg:text-base max-md:text-sm">Nico Robin</span>
                </div> 
                <div className="flex items-center justify-center gap-4">
                    <div className="rating">
                        <div className="mask mask-star bg-jaune max-lg:size-4" aria-label="1 star"></div>
                        <div className="mask mask-star bg-jaune max-lg:size-4" aria-label="2 star"></div>
                        <div className="mask mask-star bg-jaune max-lg:size-4" aria-label="3 star"></div>
                        <div className="mask mask-star bg-jaune max-lg:size-4" aria-label="4 star" aria-current="true"></div>
                        <div className="mask mask-star bg-jaune max-lg:size-4" aria-label="5 star"></div>
                    </div>
                    <span className="text-base text-gris-10 font-bold text-center max-md:text-sm">{new Date().toLocaleDateString()}</span>
                </div>                   
            </div>
            <div className="w-4/5 text-left text-xl text-gris-12 font-semibold max-lg:w-full max-lg:text-base max-xs:text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua.
            </div>
        </div>
    )
}

export default CommentaireCard
