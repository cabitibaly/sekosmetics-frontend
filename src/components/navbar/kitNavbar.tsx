"use client"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface Props {
    validationFn: () => void
}

const KitNavbar = ({ validationFn }: Props) => {

    return (
        <nav className={`fixed z-40 left-1/2 -translate-1/2 top-12 border border-red-4 bg-red-1 py-3 px-8 w-[90%] rounded-3xl flex items-center justify-between gap-4 max-[896px]:hidden`}>
            <Link href={"/"} className="pl-6 relative cursor-pointer flex items-center justify-center gap-1 transition-all duration-300 ease-out hover:-translate-x-2">
                <ChevronLeft strokeWidth={1.5} className="absolute left-0 top-[5px] size-5 stroke-gris-12" />
                <span className="font-jura text-xl text-gris-12 font-bold">Retour</span>
            </Link>
            <span className="font-jura text-2xl text-red-8 font-bold">Mon kit</span>
            <button onClick={() => validationFn()} className="bg-red-8 rounded-full font-bold text-gris-12 tetx-base py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                max-lg:text-sm">
                Confirmer
            </button>
        </nav>
    )
}

export default KitNavbar
