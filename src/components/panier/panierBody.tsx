"use client"
import Link from "next/link"
import ResumerPanier from "./resumerPanier"

const PanierBody = () => {

    return (
        <section className='overflow-x-hidden relative px-[150px] pt-32 py-6 w-screen h-screen flex flex-col items-center justify-start gap-4 max-2xl:px-[100px] max-xl:px-[60px] max-896:py-20  max-896:!px-4'>
            <div className="w-3/4 flex flex-col items-start justify-center gap-4 max-xl:w-4/5 max-lg:w-full">
                <h1 className="text-4xl text-gris-12 font-bold max-896:hidden">Mon Panier</h1>
                <ResumerPanier />
            </div>
            <Link href={"/panier/verification"} className={`absolute left-1/2 -translate-1/2 bottom-2 rounded-full font-bold bg-red-8 w-[91.96%] hidden items-center justify-center text-gris-12 text-lg py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                max-lg:text-sm max-896:flex`}>
                Commander
            </Link>
        </section>
    )
}

export default PanierBody
