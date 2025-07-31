"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const CompteNavbar = () => {
    const pathName = usePathname().split('/')[2]  

    return (
        <div className='border border-red-3 p-4 rounded-3xl bg-red-1 w-2/5 flex flex-col items-start justify-start gap-4 max-xl:gap-1 max-896:hidden'>
            <Link 
                href={"/compte/modifier-compte"} 
                className={`px-4 py-2 rounded-full flex items-center justify-center text-xl font-bold transition duration-300 ease-in-out hover:bg-red-8 hover:text-gris-12
                   max-xl:text-base ${pathName === "modifier-compte" ? "bg-red-8 text-gris-12" : "bg-transparent text-gris-8"}
                `}
            >
                Mon profil
            </Link>
            <Link 
                href={"/compte/mot-de-passe"} 
                className={`px-4 py-2 rounded-full flex items-center justify-center text-xl font-bold transition duration-300 ease-in-out hover:bg-red-8 hover:text-gris-12
                   max-xl:text-base ${pathName === "mot-de-passe" ? "bg-red-8 text-gris-12" : "bg-transparent text-gris-8"}
                `}
            >
                Mot de passe
            </Link>
            <Link 
                href={"/compte/mes-commandes"} 
                className={`px-4 py-2 rounded-full flex items-center justify-center text-xl font-bold transition duration-300 ease-in-out hover:bg-red-8 hover:text-gris-12
                   max-xl:text-base ${pathName === "mes-commandes" ? "bg-red-8 text-gris-12" : "bg-transparent text-gris-8"}
                `}
            >
                Mes commandes
            </Link>
            <Link 
                href={"/compte/mes-favoris"} 
                className={`px-4 py-2 rounded-full flex items-center justify-center text-xl font-bold transition duration-300 ease-in-out hover:bg-red-8 hover:text-gris-12
                   max-xl:text-base ${pathName === "mes-favoris" ? "bg-red-8 text-gris-12" : "bg-transparent text-gris-8"}
                `}
            >
                Mes Favoris
            </Link>
            <Link 
                href={"/compte/recherche-recente"} 
                className={`px-4 py-2 rounded-full flex items-center justify-center text-xl font-bold transition duration-300 ease-in-out hover:bg-red-8 hover:text-gris-12
                   max-xl:text-base ${pathName === "recherche-recente" ? "bg-red-8 text-gris-12" : "bg-transparent text-gris-8"}
                `}
            >
                Recherche récente
            </Link>
            <hr className='my-2 w-full border border-red-4' />
            <button className='cursor-pointer px-4 text-xl text-red-6 font-bold transition duration-200 hover:text-red-8 max-xl:text-base'>Déconnexion</button>
        </div>
    )
}

export default CompteNavbar
