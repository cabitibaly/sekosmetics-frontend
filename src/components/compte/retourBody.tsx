"use client"
import { Search } from "lucide-react"
import CompteNavbar from "../navbar/compteNavbar"
import { useState } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import RetourDetail from "./retourDetail"
import RetourCard from "../cards/retourCard"
import { useGetLesRetours } from "@/hooks/retour-fetch/retourFetch"

const RetourBody = () => {
    const [retour, setRetourId] = useState<number | null>(null)    
    const [recherche, setRecherche] = useState<string>("")
    const debouceValue = useDebounce(recherche, 500);
    const { retours } = useGetLesRetours({numeroRetour: debouceValue.trim() || ""});

    return (
        <div className={`overflow-x-hidden px-[100px] pt-32 py-6 w-screen h-screen flex items-start justify-center gap-4 max-xl:px-[30px] max-896:flex-wrap max-896:!pb-4 max-896:!px-4 ${retour  ? "max-896:pt-10" : "max-896:pt-20"}`}>
            <div className='w-4/5 h-full flex items-start justify-center gap-8 max-lg:w-[90%] max-896:!w-full'>
                <CompteNavbar />
                <div className='border border-red-3 p-4 rounded-3xl bg-red-1 w-3/5 h-full flex flex-col items-center justify-start gap-4 max-896:w-full max-896:bg-transparent max-896:border-none max-896:p-0'>
                    {   
                        !retour &&
                        <>
                            <div className="w-full flex items-center justify-between gap-4">   
                                <label htmlFor="recherche-retour" className="sr-only">Recherche retour</label>
                                <div className="relative w-full flex items-center justify-center">
                                    <Search strokeWidth={1.25} className="stroke-gris-11 size-6 absolute left-4 max-896:size-5 max-sm:left-3" />
                                    <input value={recherche} onChange={e => setRecherche(e.target.value)} id="recherche-retour" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 pl-12 p-1.5 placeholder:text-gris-6 max-896:text-sm max-lg:pl-11 max-md:pl-9" placeholder="Rechercher un retour..." />
                                </div>
                            </div>
                            <div className="overflow-auto w-full flex flex-col items-center justify-start gap-3">
                                {
                                    retours.map((retour) => (
                                        <RetourCard
                                            key={retour.idRetour} 
                                            id={retour.idRetour!}
                                            numero={retour.numeroRetour.toUpperCase() || ""}
                                            statut={retour.statutRetour || ""}
                                            date={new Date(retour.dateCreationRetour!).toLocaleDateString()}                                            
                                            setRetour={setRetourId}                                            
                                        />
                                    ))
                                }                                
                            </div>
                        </>
                    } 
                    {
                        retour &&
                        <RetourDetail id={retour} setRetourId={setRetourId} />
                    }                       
                </div>
            </div>
        </div>
    )
}

export default RetourBody
