"use client"
import { useState } from "react"
import ResumerPanier from "../resumerPanier"
import VerificationTopBar from "./verificationTopBar"
import InfoPersonnelle from "./infoPersonnelle"
import AdresseLivraison from "./adresseLivraison"
import ModePaiement from "./modePaiement"
import Confirmation from "./confirmation"
import { toast, ToastContainer } from "react-toastify"
import { Code } from "@/types/codeField"
import axios from "axios"
import { usePanier } from "@/hooks/usePanier"
import { useRouter } from "next/navigation"
import { baseUrl } from "@/constant/baseUrl"

const VerificationBody = () => {
    const { panier, viderPanier } = usePanier()
    const [tab, setTab] = useState<number>(1)
    const [adresseId, setAdresseId] = useState<number | null>(null)
    const [codeValide, setCodeValide] = useState<Code | null>(null)
    const [total, setTotal] = useState<number>(0)
    const router = useRouter();
    const fraisLivraison = 1500

    const passerUneCommande = () => {

        if(tab !== 4) return

        axios.post(
            `${baseUrl}/commande/passer`,
            {
                data: {
                    montantTotal: total,
                    fraisDeLivraison: codeValide?.typeReductionCode === "LIVRAISON_GRATUITE" ? 0 : fraisLivraison,
                    reductionCommande: codeValide ? codeValide.valeurReductionCode : 0,
                    adresseLivraisonId: adresseId
                },
                codePromo: codeValide?.code,
                lignesCommande: panier.map(({ image, nomArticle, ...rest }) => rest)
            },
            { withCredentials: true }
        ).then(res => {
            if(res.status === 201) {
                toast.success(
                    "Votre commande a bien été passée",
                    {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                )
                setTimeout(() => {
                    router.push("/")
                }, 3000) 

                viderPanier()
            }
        }).catch(err => {
            toast.error(
                err.response?.data?.message || "Une erreur est survenue",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            )
        })
    }

    return (
        <section className='overflow-x-hidden px-[150px] pt-32 py-6 w-screen min-h-screen flex flex-col items-center justify-start gap-8 max-896:py-20  max-896:!px-4'>
            <div className="absolute top-0"><ToastContainer /></div>
            <div className="w-2/3 flex flex-col items-center justify-start gap-4 max-xl:w-4/5 max-lg:w-full">
                <div className={`z-50 fixed top-0 left-0 w-full bg-red-2 ${tab === 1 ? "hidden" : ""}`}>
                    <VerificationTopBar 
                        title={tab === 1 ? "Info. Personnelle" : tab === 2 ? "Adresse Livraison" :tab === 3 ? "Mode paiement" :"Confirmation"}
                        setTab={setTab} 
                        tab={tab} 
                    />                
                </div>
                <div className="w-[91.96%] z-50 hidden items-center justify-between max-896:flex max-896:fixed max-896:left-1/2 max-896:-translate-1/2 max-896:bottom-2">
                    <button disabled={tab === 4} onClick={() => setTab(tab + 1)} className={`rounded-full font-bold bg-red-8 items-center justify-center text-gris-12 text-lg py-1 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-lg:text-sm max-896:w-full ${tab === 4 ? "hidden" : "flex"}`}>
                        Suivant
                    </button>
                    <button onClick={() => passerUneCommande()} className={`w-full rounded-full font-bold bg-red-8 items-center justify-center text-gris-12 text-lg py-1 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-lg:text-sm ${tab === 4 ? "flex" : "hidden"}`}>
                        Terminer
                    </button>
                </div>
                
                <div className="w-full flex items-center justify-between gap-8 max-896:hidden">
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
                
                {tab === 1 && <InfoPersonnelle />}
                {tab === 2 && <AdresseLivraison setAdresseId={setAdresseId} />}
                {tab === 3 && <ModePaiement />}
                { 
                    tab === 4 &&
                    <Confirmation                         
                        total={total}
                        setTotal={setTotal}
                        fraisLivraison={fraisLivraison}
                        setCodeValide={setCodeValide}
                    />
                }

                <div className="w-full flex items-center justify-between max-896:hidden">
                    <button disabled={tab === 1} onClick={() => setTab(tab - 1)} className={"cursor-pointer text-lg text-red-8 underline max-lg:text-sm max-896:hidden"}>
                        Précédent
                    </button>
                    <button disabled={tab === 4} onClick={() => setTab(tab + 1)} className={`rounded-full font-bold bg-red-8 items-center justify-center text-gris-12 text-lg py-1 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-lg:text-sm ${tab === 4 ? "hidden" : "flex"}`}>
                        Suivant
                    </button>
                    <button onClick={() => passerUneCommande()} className={`rounded-full font-bold bg-red-8 items-center justify-center text-gris-12 text-lg py-1 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-lg:text-sm ${tab === 4 ? "flex" : "hidden"}`}>
                        Terminer
                    </button>
                </div>
            </div>                        
            
            <hr className="border border-dashed border-gris-6 w-2/3 max-xl:w-4/5 max-lg:w-full" />
            <div className="w-2/3 flex flex-col items-start justify-center gap-4 max-xl:w-4/5 max-lg:w-full">
                <h1 className="text-4xl text-gris-12 font-bold max-896:hidden">Résumé du Panier</h1>
                <ResumerPanier isBtn={false} isConfirmation={tab === 4} />
            </div>         
        </section>
    )
}

export default VerificationBody
