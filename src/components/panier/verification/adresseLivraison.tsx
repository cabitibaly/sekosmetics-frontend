"use client"
import AdresseCard from "@/components/cards/adresseCard"
import AjouterUnAdresse from "@/components/modal/ajouterUnAdresse"
import { useGetLesAdresses } from "@/hooks/adresseLivraison-fetch/adresseLivraisonFetch"
import { useEffect, useState } from "react"
import { MoonLoader } from "react-spinners"

interface AdresseLivraisonProps {
    setAdresseId: (id: number | null) => void
}

const AdresseLivraison = ({ setAdresseId }: AdresseLivraisonProps) => {
    const { adresses, isLoading, refetch } = useGetLesAdresses();
    const [estParDefaut, setEstParDefaut] = useState<number | null>(null)  
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)    

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
                                                
        </div>
    )
}

export default AdresseLivraison
