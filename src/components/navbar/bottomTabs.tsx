"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import HomeActive from "../../../public/svg/homeActive"
import { HomeIcon } from "../../../public/svg/homeIcon"
import LoupeActive from "../../../public/svg/loupeActive"
import LoupeIcon from "../../../public/svg/loupeIcon"
import HeartActive from "../../../public/svg/heartActive"
import HeartIcon from "../../../public/svg/heartIcon"
import CompteActiveIcon from "../../../public/svg/compteActive"
import CompteIcon from "../../../public/svg/compteIcon"
import CartIcon from "../../../public/svg/cartIcon"
import { usePanier } from "@/hooks/usePanier"
import { useAuth } from "@/hooks/useAuth"

interface Props {
    inArticle?: boolean
}

const BottomTabs = ({ inArticle = false }: Props) => {
    const pathname = usePathname()
    const { estVide } = usePanier()
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    return (
        <div className={`fixed left-1/2 z-40 -translate-1/2 bottom-2 w-[91.96%] py-3 px-8 rounded-full border border-red-3 bg-red-1 hidden items-center justify-between gap-16 max-xs:px-4 ${inArticle ? "hidden" : "max-[896px]:flex"}`}>
            <div className="flex items-center justify-between w-[30%]">
                <Link href={"/"} className="size-8 flex items-center justify-center cursor-pointer max-xs:size-6">
                    {
                        pathname === "/" ? <HomeActive className="size-full" color="#FF7993" /> : <HomeIcon className="size-full" color="#1E1F24" />                        
                    }
                </Link>
                <Link href={"/recherche"} className="size-8 flex items-center justify-center cursor-pointer max-xs:size-6">
                    {
                        pathname === "/recherche" ? <LoupeActive className="size-full" color="#FF7993" /> : <LoupeIcon className="size-full" color="#1E1F24" />                        
                    }
                </Link>
            </div>                    
            <Link href={"/panier"} className="p-0.5 absolute left-1/2 -translate-1/2 size-12 rounded-full bg-gris-1 flex items-center justify-center cursor-pointer max-xs:size-10">
                <div className={`rounded-full size-full flex items-center justify-center ${estVide ? "bg-red-6" : "bg-red-8"}`}>
                    <CartIcon className="size-6" />
                </div>
            </Link>
            <div className="flex items-center justify-between w-[30%]">
                <Link href={"/compte/mes-favoris"} className="size-8 flex items-center justify-center cursor-pointer max-xs:size-6">
                    {
                        pathname === "/compte/mes-favoris" ? <HeartActive className="size-full" color="#FF7993" /> : <HeartIcon className="size-full" color="#1E1F24" />                        
                    }
                </Link>
                <Link 
                    href={"/compte"} 
                    className="size-8 flex items-center justify-center cursor-pointer max-xs:size-6"
                    onClick={e => {
                        if (!isAuthenticated) {
                            e.preventDefault();
                            router.push("/connexion");
                        }
                    }}
                >
                    {   
                        pathname === "/compte" ? <CompteActiveIcon className="size-full" color="#FF7993" /> : <CompteIcon className="size-full" color="#1E1F24" />                        
                    }
                </Link>
            </div>                    
        </div>
    )
}

export default BottomTabs
