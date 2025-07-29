"use client"
import { articles } from "@/data/articles"
import { LigneCommande } from "@/types/ligneCommande"
import { useState, useEffect, createContext, ReactNode } from "react"

type KitContextType = {
    kit: LigneCommande[],
    ajouterLigneKit: (id: number) => void,
    supprimerLigneKit: (id: number) => void,
    viderKit: () => void,
}

export const KitContext = createContext<KitContextType | undefined>(undefined)

export const KitProvider = ({ children }: { children: ReactNode}) => {

    const [kit, setKit] = useState<LigneCommande[]>([])

    useEffect(() => {
        const localStorageKit = localStorage.getItem("kit")

        if (localStorageKit) {
            setKit(JSON.parse(localStorageKit))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("kit", JSON.stringify(kit))
    }, [kit]) 

    const ajouterLigneKit = (id: number) => {
        const existe = articles.find(a => a.id === Number(id))
    
        if(existe) {
            setKit(prev => {
                const kitExiste = prev.find(k => k?.articleId === Number(id))
                if(kitExiste) {
                    return prev?.filter(k => k?.articleId !== Number(id))
                }
    
                return [{ articleId: Number(id), quantiteLigne: 1, prixUnitaire: existe.prix, prixTotal: existe.prix, image: existe.image }, ...prev]
            })
        }
    }

    const supprimerLigneKit = (id: number) => {
        setKit(prev => prev.filter(item => item.articleId !== id))
    }

    const viderKit = () => { setKit([]) }

    return (
        <KitContext.Provider value={{kit, ajouterLigneKit, supprimerLigneKit, viderKit}}>
            {children}
        </KitContext.Provider>
    )
}