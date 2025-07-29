"use client"
import AdresseCard from "@/components/cards/adresseCard"
import { useState } from "react"

const AdresseLivraison = () => {
    const [estParDefaut, setEstParDefaut] = useState<number>(1)    

    return (
        <div className="px-4 w-full h-[65vh] overflow-y-auto flex flex-col items-start justify-start gap-4 max-xs:px-0">
            <div className="w-full flex items-center justify-between">
                <span className="text-2xl text-gris-12 font-normal max-896:text-lg">Adresse livraison</span>
                <button className="cursor-pointer text-2xl text-red-8 hover:underline max-896:text-lg">Ajouter</button>
            </div>            
            <AdresseCard
                id={1}
                pays={"Côte d'Ivoire"}
                ville={"Abidjan"}
                commune={"Adjamé"}
                quartier={"Makan Traoré"}                
                estParDefaut={estParDefaut}
                setEstParDefaut={setEstParDefaut}
            />        
            <AdresseCard
                id={2}
                pays={"Côte d'Ivoire"}
                ville={"Abidjan"}
                commune={"Adjamé"}
                quartier={"Makan Traoré"}
                estParDefaut={estParDefaut}
                setEstParDefaut={setEstParDefaut}
            />       
        </div>
    )
}

export default AdresseLivraison
