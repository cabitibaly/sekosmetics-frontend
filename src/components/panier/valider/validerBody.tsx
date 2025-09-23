"use client"
import { useAuth } from "@/hooks/useAuth"
import { Check } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { MoonLoader } from "react-spinners"


const ValiderWrapper = () => {
    const searchParams = useSearchParams()
    const livreAujourdhui = searchParams.get("livreAujourdhui")   
    const { isAuthenticated } = useAuth() 
  
    return (
        <section className='overflow-x-hidden px-[150px] pt-32 py-6 w-screen min-h-screen flex flex-col items-center justify-center gap-8 max-896:py-20  max-896:!px-4'>
            <div className="border border-red-3 px-4 py-6 rounded-2xl bg-red-1 w-1/2 flex flex-col items-center justify-center gap-4 max-xl:w-3/5 max-lg:w-4/5 max-896:bg-transparent max-896:border-none max-896:p-0 max-sm:w-full">
                <div className="border border-red-8 aspect-square rounded-full size-16 flex items-center justify-center">
                    <Check strokeWidth={1} className="size-10 stroke-red-8" />
                </div>
                <span className="text-center text-3xl text-gris-12 font-bold max-xl:text-2xl">Votre commande a bien été créée</span>
                <span className="text-center text-xl text-gris-12 font-medium max-xl:text-lg">
                    Nous vous enverrons une confirmation d&apos;expédition par e-mail dès que votre commande sera expédiée.
                </span>
                {    
                    livreAujourdhui === "true" &&
                    <span className="text-center text-xl text-gris-12 font-medium max-xl:text-lg">
                        Nous vous prions de contacter rapidement le numéro suivant pour la planification de votre commande : 
                        <span className="text-red-8 font-black"> +2250748861829</span>
                    </span>
                }
                {    
                    isAuthenticated &&
                    <Link href={"/compte/mes-commandes"} className={`rounded-full font-bold bg-red-8 items-center justify-center text-gris-12 text-base py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6`}>
                        Voir vos commandes
                    </Link>
                }
            </div>
        </section>
    )
}

const ValiderBody = () => {
    return (
        <Suspense
            fallback={
                <div className='w-screen h-screen flex items-center justify-center'>
                    <MoonLoader 
                        color="#FF7993"
                        size={24}
                    />
                </div>
            }
        >
            <ValiderWrapper />
        </Suspense>
    )
}

export default ValiderBody
