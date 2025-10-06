"use client"
import Link from "next/link"
import ResumerPanier from "./resumerPanier"
import { usePanier } from "@/hooks/usePanier"
import { toast } from "react-toastify"

const PanierBody = () => {
    const { estVide } = usePanier()    

    return (
        <section className='overflow-x-hidden relative px-[150px] pt-32 py-6 w-screen h-screen flex flex-col items-center justify-start gap-4 max-2xl:px-[100px] max-xl:px-[60px] max-896:py-16  max-896:!px-4'>
            <div className="overflow-auto p-2 w-3/4 flex flex-col items-start justify-start gap-4 max-xl:w-4/5 max-lg:w-full max-896:max-h-[100%]">
                <h1 className="text-4xl text-gris-12 font-bold max-896:hidden">Mon Panier</h1>
                <ResumerPanier />
            </div>
            <Link
                onClick={(e) => {
                    if(estVide) {
                        e.preventDefault()
                        toast.info("Vous devez ajouter au moins un article à votre panier")
                    }
                }}
                href={"/panier/verification"} 
                className={`
                    rounded-full font-bold bg-red-8 w-full hidden items-center justify-center text-gris-12 text-lg py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                    max-lg:text-sm max-896:flex
                `}>
                Commander
            </Link>
        </section>
    )
}

export default PanierBody
