"use client"
import { LigneCommande } from "@/types/ligneCommande"
import { useState, useEffect, createContext, ReactNode } from "react"

type KitContextType = {
    kit: LigneCommande[],
    ajouterLigneKit: (ligne: LigneCommande) => void,
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

    const ajouterLigneKit = (ligne: LigneCommande) => {                
        setKit(prev => {
            const kitExiste = prev.find(k => k?.articleId === Number(ligne.articleId))
            if(kitExiste) {
                return prev?.filter(k => k?.articleId !== Number(ligne.articleId))
            }
        
            return [
                {                     
                    articleId: Number(ligne.articleId), 
                    quantiteLigne: 1, 
                    prixUnitaire: ligne.prixUnitaire, 
                    prixTotal: ligne.prixUnitaire, 
                    image: ligne.image, 
                    nomArticle: ligne.nomArticle,
                    valeursOption: ligne.valeursOption
                }, 
                ...prev
            ]
        })        
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