"use client"
import AdresseCard from "@/components/cards/adresseCard"
import AjouterUnAdresse from "@/components/modal/ajouterUnAdresse"
import { useGetLesAdresses } from "@/hooks/adresseLivraison-fetch/adresseLivraisonFetch"
import { useAuth } from "@/hooks/useAuth"
import { AdresseInvite, AdresseInviteAction } from "@/types/clientInvite"
import React, { useEffect, useState } from "react"
import { MoonLoader } from "react-spinners"

interface AdresseLivraisonProps {
    setAdresseId: (id: number | null) => void,
    adresseInvite: AdresseInvite, 
    dispatch: React.Dispatch<AdresseInviteAction>
}

const AdresseLivraison = ({ setAdresseId, adresseInvite, dispatch }: AdresseLivraisonProps) => {
    const { adresses, isLoading, refetch } = useGetLesAdresses();
    const [estParDefaut, setEstParDefaut] = useState<number | null>(null)  
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)  
    const { isAuthenticated } = useAuth()  

    useEffect(() => {

        if(estParDefaut) {
            setAdresseId(estParDefaut)
        }        

    }, [estParDefaut, setAdresseId])
    
    useEffect(() => {

        if(adresses.length > 0) {
            const adresseParDefaut = adresses.find(adresse => adresse.estAdresseParDefaut)
            setEstParDefaut(adresseParDefaut?.idAdressL || adresses[0].idAdressL)
        }
        
    }, [adresses])

    useEffect(() => {
        document.body.style.overflow = isModalVisible ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isModalVisible]);
    
    return (
        <div className="px-4 w-full max-h-[65vh] overflow-y-auto flex flex-col items-start justify-start gap-4 min-896:h-[65vh] max-xs:px-0">
            {                    
                isAuthenticated &&
                <>
                    <div className="w-full flex items-center justify-between">
                        <span className="text-2xl text-gris-12 font-normal max-896:text-lg">Adresse livraison</span>
                        <button onClick={() => setIsModalVisible(!isModalVisible)} className="cursor-pointer text-2xl text-red-8 hover:underline max-896:text-lg">Ajouter</button>
                    </div>
                    {
                        isLoading &&
                        <div className="w-full h-40 flex items-center justify-center gap-4">
                            <MoonLoader 
                                color="#FF7993" 
                                size={24} 
                            />
                        </div>
                    } 
                    {
                        adresses.length > 0 && !isLoading &&
                            adresses.map((adresse, index) => (
                                <AdresseCard
                                    key={adresse.idAdressL}
                                    index={index}
                                    id={adresse.idAdressL}
                                    pays={adresse.pays}
                                    ville={adresse.ville}
                                    commune={adresse.commune}
                                    quartier={adresse.quartier}                
                                    estParDefaut={estParDefaut}
                                    setEstParDefaut={setEstParDefaut}
                                />
                            ))
                    }

                    {
                        adresses.length === 0 && !isLoading &&
                        <div className="w-full h-40 flex items-center justify-center gap-4">
                            <div className="line-clamp-2 text-lg text-gris-12 font-bold ">Aucune adresse</div>
                        </div>
                    }

                    {
                        isModalVisible &&
                            <AjouterUnAdresse 
                                isModalOpen={isModalVisible} 
                                setIsModalOpen={setIsModalVisible} 
                                refetchAdresses={refetch}
                            />
                    }
                </>
            }

            {    
                !isAuthenticated &&
                <div className="w-full flex flex-col items-center justify-center gap-4">
                    <div className="w-full flex flex-col items-start justify-start gap-4 max-896:gap-2">
                        <span className="text-base text-gris-12 font-normal max-lg:text-lg max-896:text-base">Pays</span>
                        <input  
                            id="pays" 
                            value={adresseInvite.pays}
                            onChange={e => dispatch({ type: "SET_PAYS", payload: e.target.value })}
                            type="text" 
                            className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" 
                            placeholder="Votre pays..." 
                        />
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-4 max-896:gap-2">
                        <label htmlFor="ville" className="text-base text-gris-12 font-normal max-lg:text-lg max-896:text-base">Ville</label>
                        <input 
                            id="ville" 
                            value={adresseInvite.ville}
                            onChange={e => dispatch({ type: "SET_VILLE", payload: e.target.value })}
                            type="text" 
                            className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" 
                            placeholder="Votre ville..." 
                        />
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-4 max-896:gap-2">
                        <label htmlFor="commune" className="text-base text-gris-12 font-normal max-lg:text-lg max-896:text-base">Commune</label>
                        <input 
                            id="commune"
                            value={adresseInvite.commune}
                            onChange={e => dispatch({ type: "SET_COMMUNE", payload: e.target.value })} 
                            type="text" 
                            className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" 
                            placeholder="Votre commune..." 
                        />
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-4 max-896:gap-2">
                        <label htmlFor="quartier" className="text-base text-gris-12 font-normal max-lg:text-lg max-896:text-base">Quartier</label>
                        <input 
                            id="quartier"
                            value={adresseInvite.quartier}
                            onChange={e => dispatch({ type: "SET_QUARTIER", payload: e.target.value })}
                            type="text" 
                            className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" 
                            placeholder="Votre quartier..." 
                        />
                    </div>
                </div>
            }                           
        </div>
    )
}

export default AdresseLivraison
