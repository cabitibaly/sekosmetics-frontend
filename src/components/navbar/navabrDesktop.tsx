"use client";

import { usePanier } from "@/hooks/usePanier";
import { useHideOnScroll } from "@/utils/useHideOnScroll";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NavbarDesktop = () => {
    const [dernierePosition, setDernierePosition] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(true);
    useHideOnScroll({ dernierePosition, setDernierePosition, setVisible});
    const {estVide} = usePanier();    

    return (
        <>
            <nav className={`fixed z-40 left-1/2 -translate-1/2 border border-red-4 bg-red-1 py-3 px-8 w-[90%] rounded-3xl flex items-center justify-between gap-4 transition-transform ease-linear duration-200 ${visible ? "translate-y-4" : "-translate-y-full"} max-[896px]:hidden`}>
                <Link href={"/"} className="text-gris-12 text-2xl font-bold max-xl:text-lg">Sekosmetics</Link>
                <div className="flex items-center justify-between gap-12">
                    <Link href={"/news"} className="text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 max-lg:text-sm">News</Link>
                    <Link href={"/categories"} className="text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 max-lg:text-sm">Categories</Link>
                    <Link href={"/marques"} className="text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 max-lg:text-sm">Marques</Link>
                    <Link href={"/offres"} className="text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 max-lg:text-sm">Offres Promo</Link>
                </div>
                <div className="flex items-center justify-between gap-6">
                    <Link href={"/search"}>
                        <Image src={"/search.svg"} width={18} height={20} alt={"search"} className="object-cover" />                    
                    </Link>
                    <Link href={"/panier"} className="relative">
                        <Image src={"/bag.svg"} width={18} height={20} alt={"search"} className="object-cover" />
                        <div className={`absolute z-50 top-0 -right-[2px] size-2 bg-red-8 rounded-full ${estVide ? "hidden" : ""}`}>

                        </div>
                    </Link>
                    <Link href={"/compte"}>
                        <Image src={"/user.svg"} width={18} height={20} alt={"search"} className="object-cover " />
                    </Link>
                </div>
            </nav>            
        </>
    )
}

export default NavbarDesktop;
