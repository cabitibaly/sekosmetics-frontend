"use client"

import Image from "next/image"
import Link from "next/link"

const OffrePromoBody = () => {
    return (
        <div className="overflow-x-hidden px-[150px] py-12 w-screen min-h-screen flex flex-col items-center justify-start gap-8 max-2xl:px-[100px] max-xl:px-[60px] max-896:!px-4 max-896:!pt-20 max-896:!pb-36 max-md:gap-6 max-xs:!pb-28">
            <div className="bg-red-6 w-full aspect-video max-896:hidden">

            </div>
            <div className="px-4 relative top-0 w-screen hidden items-center justify-center max-[896px]:flex">
                <div className="rounded-3xl relative w-full aspect-video flex items-center justify-between">
                    <Image src={"/hero-bg.jpg"} fill alt="hero-bg" className="object-cover rounded-3xl"/>
                </div>
            </div>            
            <div className="w-full flex flex-col items-center justify-center gap-8 max-896:gap-4">
                <Link href={`/offre-promotionnelle/${1}`} className="relative w-full aspect-video rounded-2xl group overflow-hidden">
                    <Image src={"/otp.jpg"} fill alt="otp" className="rounded-2xl object-cover transition duration-300 ease-in-out group-hover:scale-110"/>
                </Link>
                <Link href={`/offre-promotionnelle/${1}`} className="relative w-full aspect-video rounded-2xl group overflow-hidden">
                    <Image src={"/mdp-forgot.jpg"} fill alt="otp" className="rounded-2xl object-cover transition duration-300 ease-in-out group-hover:scale-110"/>
                </Link>
                <Link href={`/offre-promotionnelle/${1}`} className="relative w-full aspect-video rounded-2xl group overflow-hidden">
                    <Image src={"/mdp-reset.jpg"} fill alt="otp" className="rounded-2xl object-cover transition duration-300 ease-in-out group-hover:scale-110"/>
                </Link>
            </div>
        </div>
    )
}

export default OffrePromoBody
