import { ChevronRight } from "lucide-react"
import Image from "next/image"
import CompteLink from "./compteLink"
import Link from "next/link"
import LogoutIcon from "../../../public/svg/logoutIcon"
import { useAuth } from "@/hooks/useAuth"

const CompteBody = () => {
    const { utilisateur } = useAuth()

    return (
        <div className={`overflow-x-hidden px-[100px] pt-32 py-6 w-screen h-screen flex items-center justify-center max-xl:px-[30px] max-896:flex-wrap max-896:!pb-4 max-896:!px-4 max-896:pt-20`}>
            <div className='border border-red-3 p-4 bg-red-1 rounded-3xl w-2/5 h-full flex flex-col items-center justify-start gap-8 max-xl:w-3/5 max-896:!w-full max-896:bg-transparent max-896:border-none max-896:p-0'>
                <Link href="/compte/modifier-compte" className="cursor-pointer p-4 bg-red-3 rounded-3xl w-full flex items-center justify-between gap-4 group transition duration-200 ease-in-out hover:bg-red-4/70">
                    <div className="flex items-center justify-center gap-3">
                        {
                            utilisateur?.img ?
                                <div className='relative size-24 aspect-square flex items-center justify-center rounded-full max-md:size-16'>
                                    <Image src={utilisateur.img} fill alt="user-icon" className='object-cover rounded-full' />                        
                                </div>
                            :
                                <div className='relative size-24 aspect-square flex items-center justify-center rounded-full max-md:size-16'>
                                    <span className="text-bold text-red-1 text-xl">{utilisateur?.nomClient.charAt(0)}</span>
                                </div>
                        }
                        <div className="flex flex-col items-start justify-center gap-2">
                            <p className="line-clamp-2 text-gris-12 text-xl font-bold max-md:text-base">{utilisateur?.nomClient} {utilisateur?.prenomClient}</p>
                            <span className="text-gris-8 text-xl font-bold max-md:text-base">Modifier</span>
                        </div>
                    </div>
                    <div className="cursor-pointer aspect-square transition duration-200 ease-in-out group-hover:translate-x-2">
                        <ChevronRight strokeWidth={1} className="stroke-gris-12 size-12 max-sm:size-8" />
                    </div>                    
                </Link>
                <CompteLink 
                    title="Mot de passe"
                    href="/compte/mot-de-passe"
                />
                <CompteLink 
                    title="Mes Commandes"
                    href="/compte/mes-commandes"
                />
                <CompteLink 
                    title="Mes Retours"
                    href="/compte/mes-retours"
                />
                <CompteLink 
                    title="Mes Favoris"
                    href="/compte/mes-favoris"
                />
                <CompteLink 
                    title="Recherches récentes"
                    href="/compte/recherche-recente"
                />
                <button className="cursor-pointer pr-6 w-full flex items-center justify-between gap-4 group">
                    <div className="flex items-center justify-center gap-4 max-md:gap-2">
                        <div className="size-10 rounded-full bg-red-3/60 flex items-center justify-center max-md:size-10">
                            <LogoutIcon color="#FF7993" className="size-6" />
                        </div>
                        <span className="text-red-6 text-xl font-bold transition duration-200 ease-linear group-hover:text-red-8 max-md:text-base max-369:!text-sm">Déconnexion</span>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default CompteBody
