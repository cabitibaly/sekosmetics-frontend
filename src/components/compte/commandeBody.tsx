"use client"
import { Search } from "lucide-react"
import CompteNavbar from "../navbar/compteNavbar"
import FilterIcon from "../../../public/svg/filterIcon"
import CommandeCard from "../cards/commandeCard"
import { useState } from "react"
import CommandeDetail from "./commandeDetail"

const CommandeBody = () => {
    const [commandeId, setCommandeId] = useState<number>(0)
    const [prevCommandeId, setPrevCommandeId] = useState<number>(0)

    return (
        <div className={`overflow-x-hidden px-[100px] pt-32 py-6 w-screen h-screen flex items-start justify-center gap-4 max-xl:px-[30px] max-896:flex-wrap max-896:!pb-4 max-896:!px-4 ${commandeId !== 0 && commandeId !== prevCommandeId ? "max-896:pt-10" : "max-896:pt-20"}`}>
            <div className='w-4/5 h-full flex items-start justify-center gap-8 max-lg:w-[90%] max-896:!w-full'>
                <CompteNavbar />
                <div className='border border-red-3 p-4 rounded-3xl bg-red-1 w-3/5 max-h-full flex flex-col items-center justify-start gap-4 max-896:w-full max-896:bg-transparent max-896:border-none max-896:p-0'>
                    {   
                        commandeId === 0 &&
                        <>
                            <div className="w-full flex items-center justify-between gap-4">   
                                <label htmlFor="recherche-commande" className="sr-only">Recherche Commande</label>
                                <div className="relative w-[90%] flex items-center justify-center max-896:w-[95%]">
                                    <Search strokeWidth={1.25} className="stroke-gris-11 size-6 absolute left-4 max-896:size-5 max-sm:left-3" />
                                    <input id="recherche-commande" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 pl-12 p-1.5 placeholder:text-gris-6 max-896:text-sm max-lg:pl-11 max-md:pl-9" placeholder="Rechercher une commande..." />
                                </div>
                                <button className="relative size-10 rounded-full bg-gris-3 flex items-center justify-center cursor-pointer transition duration-200 ease-in-out hover:bg-gris-4 ">
                                    <FilterIcon className="stroke-gris-12 size-5" />
                                </button>
                            </div>
                            <div className="overflow-auto w-full flex flex-col items-center justify-start gap-3">
                                <CommandeCard 
                                    id={1}
                                    numero={"CMD-178"}
                                    statut={"CONFIRMEE"}
                                    date={new Date().toLocaleDateString()}
                                    commandeId={commandeId}
                                    setCommandeId={setCommandeId}
                                    setPrevCommandeId={setPrevCommandeId}
                                />
                                <CommandeCard 
                                    id={2}
                                    numero={"CMD-267"}
                                    statut={"CREEE"}
                                    date={new Date().toLocaleDateString()}
                                    commandeId={commandeId}
                                    setCommandeId={setCommandeId}
                                    setPrevCommandeId={setPrevCommandeId}
                                />
                                <CommandeCard 
                                    id={3}
                                    numero={"CMD-643"}
                                    statut={"EXPEDIEE"}
                                    date={new Date().toLocaleDateString()}
                                    commandeId={commandeId}
                                    setCommandeId={setCommandeId}
                                    setPrevCommandeId={setPrevCommandeId}
                                />
                                <CommandeCard 
                                    id={2}
                                    numero={"CMD-368"}
                                    statut={"LIVREE"}
                                    date={new Date().toLocaleDateString()}
                                    commandeId={commandeId}
                                    setCommandeId={setCommandeId}
                                    setPrevCommandeId={setPrevCommandeId}
                                />
                            </div>
                        </>
                    } 
                    {
                        commandeId !== 0 && commandeId !== prevCommandeId &&
                        <CommandeDetail id={commandeId} setCommandeId={setCommandeId} setPrevCommandeId={setPrevCommandeId} />
                    }                       
                </div>
            </div>
        </div>
    )
}

export default CommandeBody
