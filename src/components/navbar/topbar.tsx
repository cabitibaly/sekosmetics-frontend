"use client"
import { useHideOnScroll } from "@/utils/useHideOnScroll"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface TopbarProps {
    href: string,
    title: string | undefined,
    boutonValidation?: boolean,    
    validationFn?: () => void
}

const Topbar = ({href, title, boutonValidation = false, validationFn }: TopbarProps) => {
    const [dernierePosition, setDernierePosition] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(true);
    useHideOnScroll({ dernierePosition, setDernierePosition, setVisible});       

    return (
        <div className={`fixed z-40 w-screen py-3 px-4 hidden items-center justify-center transition-transform ease-linear duration-200 max-896:flex ${visible ? "translate-y-0" : "-translate-y-full"}`}>
            <Link href={href} className="absolute top-3 left-4 size-10 text-gris-12 text-2xl font-bold transition duration-200 ease-in-out hover:-translate-x-2 max-xl:text-lg">
                <Image src={"/bouton-retour.svg"} fill alt="retour-btn"/>
            </Link>
            <div className="max-w-[70%] relative top-1 line-clamp-1 text-center text-gris-12 text-2xl font-bold">{title}</div>
            {   
                boutonValidation &&
                <button onClick={() => validationFn?.()} className="cursor-pointer absolute top-3 right-4 size-10 text-gris-12 text-2xl font-bold transition duration-200 ease-in-out hover:translate-x-2 max-xl:text-lg">
                    <Image src={"/bouton-valide.svg"} fill alt="valide-btn"/>
                </button>
            }            
        </div>
    )
}

export default Topbar
