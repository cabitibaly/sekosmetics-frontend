"use client"
import { useState } from "react"

const VerificationBody = () => {
    const [tab, setTab] = useState<number>(1)

    return (
        <section className='overflow-x-hidden px-[150px] pt-32 py-6 w-screen h-screen flex items-start justify-center gap-4 max-896:py-20  max-896:!px-4'>
            <div className="border border-red-4 p-1 w-2/3 flex flex-col items-center justify-start gap-4 max-xl:w-4/5 max-lg:w-full">
                <div className="w-full flex items-center justify-between gap-8 max-md:gap-4">
                    <div className={"flex flex-col gap-1"}>
                        <span className={`text-sm text-red-8 max-md:text-xs`}>info. Personnelle</span>
                        <div className={`w-full bg-red-4 p-[3px] rounded-full`} />
                    </div>
                    <div className={"flex flex-col gap-1"}>
                        <span className={`text-sm  transition-all duration-200 ease-in max-md:text-xs ${tab >= 2 ? "text-red-8" : "text-gris-6"}`}>Adresse Livraison</span>
                        <div className={`w-full bg-red-4 p-[3px] rounded-full  transition-all duration-200 ease-in ${tab >= 2 ? "visible" : "invisible"}`} />
                    </div>
                    <div className={"flex flex-col gap-1"}>
                        <span className={`text-sm  transition-all duration-200 ease-in max-md:text-xs ${tab >= 3 ? "text-red-8" : "text-gris-6"}`}>Mode paiement</span>
                        <div className={`w-full bg-red-4 p-[3px] rounded-full  transition-all duration-200 ease-in ${tab >= 3 ? "visible" : "invisible"}`} />
                    </div>
                    <div className={"flex flex-col gap-1"}>
                        <span className={`text-sm  transition-all duration-200 ease-in max-md:text-xs ${tab >= 4 ? "text-red-8" : "text-gris-6"}`}>Confirmation</span>
                        <div className={`w-full bg-red-4 p-[3px] rounded-full  transition-all duration-200 ease-in ${tab >= 4 ? "visible" : "invisible"}`} />
                    </div>
                </div>

                <div className="w-full flex items-center justify-between">
                    <button disabled={tab === 1} onClick={() => setTab(tab - 1)} className={"cursor-pointer text-lg text-red-8 underline max-lg:text-sm"}>
                        Précédent
                    </button>
                    <button disabled={tab === 4} onClick={() => setTab(tab + 1)} className={`rounded-full font-bold bg-red-8 items-center justify-center text-gris-12 text-lg py-1 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-lg:text-sm ${tab === 4 ? "hidden" : "flex"}`}>
                        Suivant
                    </button>
                    <button className={`rounded-full font-bold bg-red-8 items-center justify-center text-gris-12 text-lg py-1 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-lg:text-sm ${tab === 4 ? "flex" : "hidden"}`}>
                        Terminer
                    </button>
                </div>
            </div>            
        </section>
    )
}

export default VerificationBody
