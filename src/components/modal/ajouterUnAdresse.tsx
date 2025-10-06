"use client"

import { Country } from "@/types/countryField"
import { X } from "lucide-react"
import { useState } from "react"
import DropdownPays from "../dropdown/dropdownPays"
import DropdownVille from "../dropdown/dropdownVille"
import { toast } from "react-toastify"
import axios from "axios"
import { baseUrl } from "@/constant/baseUrl"

interface Props {
    isModalOpen: boolean
    setIsModalOpen: (isModalOpen: boolean) => void,
    refetchAdresses: () => void
}

const AjouterUnAdresse = ({setIsModalOpen, isModalOpen, refetchAdresses}: Props) => {
    const [paysSelected, setPaysSelected] = useState<Country | null>(null)
    const [villeSelected, setVilleSelected] = useState<string>("") 
    const [commune, setCommune] = useState<string>("")
    const [quartier, setQuartier] = useState<string>("")  
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if(commune === "" && quartier === "") {
            toast.info(
                "La commmune et le quartier sont obligatoires",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            )
            return
        }

        setIsLoading(true)

        axios.post(
            `${baseUrl}/adresse/creer`,
            {
                pays: paysSelected?.nameFr || "",
                ville: villeSelected,
                commune: commune,
                quartier: quartier
            },
            { withCredentials: true }
        ).then(res => {
            if(res.status === 201) {
                toast.success(
                    "Votre adresse a bien été créée",
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                )
                
                setCommune("")
                setQuartier("")
                setVilleSelected("")
                setPaysSelected(null)
                setIsModalOpen(!isModalOpen)
                refetchAdresses()
            }
        }).catch(err => {
            toast.error(
                err.response?.data?.message || "Une erreur est survenue",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            )
        }).finally(() => setIsLoading(false))
    }
    
    return (
        <div onClick={() => setIsModalOpen(!isModalOpen)} className="px-4 absolute top-0 left-0 z-[1000] w-screen h-screen flex items-center justify-center bg-gris-12/60">
            <form onSubmit={e => handleSumbit(e)} onClick={e => e.stopPropagation()} className="border border-red-4 py-4 rounded-3xl w-1/3 bg-red-1 flex flex-col gap-4 max-xl:w-1/2 max-lg:w-3/5 max-md:w-4/5 max-xs:w-full">
                <div className="border-b border-red-4 px-4 pb-4 flex items-center justify-between">
                    <span className="text-xl text-red-8 font-bold">Adresse livraison</span>
                    <button type="button" onClick={() => setIsModalOpen(!isModalOpen)} className="cursor-pointer">
                        <X className="size-6 stroke-red-8"/>
                    </button>
                </div>
                <div className="px-4 w-full flex flex-col items-center justify-center gap-4">
                    <div className="w-full flex flex-col items-start justify-start gap-4 max-896:gap-2">
                        <span className="text-xl text-gris-12 font-bold max-lg:text-lg max-896:text-base">Pays</span>
                        <DropdownPays setCountrySelcted={setPaysSelected}/>
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-4 max-896:gap-2">
                        <label htmlFor="ville" className="text-xl text-gris-12 font-bold max-lg:text-lg max-896:text-base">Ville</label>
                        <DropdownVille citySelected={setVilleSelected} pays={paysSelected?.nameEn || ""}/>
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-4 max-896:gap-2">
                        <label htmlFor="ville" className="text-xl text-gris-12 font-bold max-lg:text-lg max-896:text-base">Commune</label>
                        <input value={commune} onChange={e => setCommune(e.target.value)} id="ville" type="text" className="bg-gris-1 border border-red-4  block w-full h-[50px] text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" placeholder="Votre commune..." />
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-4 max-896:gap-2">
                        <label htmlFor="quartier" className="text-xl text-gris-12 font-bold max-lg:text-lg max-896:text-base">Quartier</label>
                        <input value={quartier} onChange={e => setQuartier(e.target.value)} id="quartier" type="text" className="bg-gris-1 border border-red-4  block w-full h-[50px] text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" placeholder="Votre quartier..." />
                    </div>
                </div>
                <div className="border-t border-red-4 px-4 pt-4 w-full flex items-center justify-between">
                    <button type="button" onClick={() => setIsModalOpen(!isModalOpen)} className="cursor-pointer text-lg text-red-8 font-bold hover:underline max-lg:text-sm">
                        Annuler
                    </button>
                    <button disabled={isLoading} type="submit" className="rounded-full font-bold bg-red-8 items-center justify-center text-gris-12 text-lg py-1 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-lg:text-sm">
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AjouterUnAdresse
