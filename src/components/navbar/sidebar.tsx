"use client"

import { useHideOnScroll } from "@/utils/useHideOnScroll";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [dernierePosition, setDernierePosition] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(true);
    useHideOnScroll({ dernierePosition, setDernierePosition, setVisible});

    const handleSidebarToglle = () => {
        setIsClicked(!isClicked);
    }

    useEffect(() => {

        if (isClicked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

    }, [isClicked])

    return (
        <>
            <div className={`fixed z-40 w-screen py-3 px-4 hidden items-center justify-between transition-transform ease-linear duration-200 ${visible ? "translate-y-2" : "-translate-y-full"} max-[896px]:flex`}>
                <div onClick={() => handleSidebarToglle()} className="size-10 flex items-center justify-center cursor-pointer">
                    <Image src={"/sidebar.svg"} width={40} height={40} alt="sidebar-btn"/>
                </div>
                <Link href={"/"} className="text-gris-12 text-2xl font-bold max-xl:text-lg">Sekosmetics</Link>
                <div className="size-10 flex items-center justify-center cursor-pointer">
                    <Image src={"/notification.svg"} width={40} height={40} alt="notification-btn"/>
                </div>
            </div>
            <div onClick={() => handleSidebarToglle()} className={`fixed z-50 h-screen w-screen bg-gris-12/60 transition-transform ease-in-out duration-300 hidden items-start justify-start max-[896px]:flex ${isClicked ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="bg-red-1 w-1/2 h-full flex flex-col items-start justify-start gap-4 p-4 max-sm:w-2/3 max-xs:w-full">
                    <div className="w-full flex items-center justify-between">
                        <Link href={"/"} className="text-gris-12 text-2xl font-bold max-xl:text-lg">Sekosmetics</Link>
                        <X onClick={() => handleSidebarToglle()} strokeWidth={1.5} className="cursor-pointer text-red-8 size-6" />
                    </div>  
                    <div className="w-full flex flex-col items-start justify-between">
                        <Link href={"/news"} className="pb-2 border-b border-gris-4 w-full text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 hover:border-red-8">News</Link>
                        <Link href={"/categories"} className="py-2 border-b border-gris-4 w-full text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 hover:border-red-8">Categories</Link>
                        <Link href={"/marques"} className="py-2 border-b border-gris-4 w-full text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 hover:border-red-8">Marques</Link>
                        <Link href={"/offres"} className="py-2 border-b border-gris-4 w-full text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 hover:border-red-8">Offres Promo</Link>
                        <Link href={"/recherche"} className="py-2 border-b border-gris-4 w-full text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 hover:border-red-8">Recherche</Link>
                    </div>                
                </div>
            </div>
        </>
    )
}

export default Sidebar
