"use client"

import { LigneCommande } from "@/types/ligneCommande"
import { useState, createContext, useContext, useEffect, ReactNode } from "react"

type PanierContextType = {
    panier: LigneCommande[],
    ajouterLigne: (ligne: LigneCommande) => void,
    supprimerLigne: (id: number) => void,
    viderPanier: () =>  void,
    estVide: boolean,
    articleExiste: (id: number) => LigneCommande | undefined,
    modifierQuantiteLigne: (id: number, quantite: number) => void
}


export const PanierContext = createContext<PanierContextType | undefined>(undefined)

export const PanierProvider = ({ children }: { children: ReactNode }) => {
    const [panier, setPanier] = useState<LigneCommande[]>([])

    useEffect(() => {
        const localStoragePanier = localStorage.getItem("panier")

        if (localStoragePanier) {
            setPanier(JSON.parse(localStoragePanier))
        }
        
    }, [])

    useEffect(() => {
        localStorage.setItem("panier", JSON.stringify(panier))
    }, [panier])

    const ajouterLigne = (ligne: LigneCommande) => {
        setPanier(prev => {
            const ligneExistant = prev.find(l => l.articleId === ligne.articleId)
            if (ligneExistant) {
                return prev.map(item =>
                    item.articleId === ligne.articleId ? { ...item, quantiteLigne: item.quantiteLigne + ligne.quantiteLigne, prixTotal: item.prixTotal + ligne.prixTotal } : item
                )
            } else {
                return [...prev, ligne]
            }
        })
    }

    const supprimerLigne = (id: number) => {
        setPanier(prev => prev.filter(item => item.articleId !== id))
    }

    const viderPanier = () => {
        setPanier([])
    }

    const articleExiste = (id: number) => {
        return panier.find(l => l.articleId === id)
    }

    const modifierQuantiteLigne = (id: number, quantite: number) => {
        setPanier(prev => prev.map(item =>
            item.articleId === id ? { ...item, quantiteLigne: quantite, prixTotal: item.prixUnitaire * quantite } : item
        ))
    }

    const estVide = panier.length === 0

    return (
        <PanierContext.Provider value={{panier, ajouterLigne, supprimerLigne, viderPanier, estVide, articleExiste, modifierQuantiteLigne}}>
            {children}
        </PanierContext.Provider>
    )
}