"use client"
import { LigneCommande } from "@/types/ligneCommande"
import { useState, createContext, useEffect, ReactNode } from "react"

type PanierContextType = {
    panier: LigneCommande[],
    ajouterLigne: (ligne: LigneCommande) => void,
    supprimerLigne: (id: number) => void,
    viderPanier: () =>  void,
    estVide: boolean,
    articleExiste: (id: number) => LigneCommande | undefined,
    modifierQuantiteLigne: (id: number, quantite: number) => void
    ajouterLignesKit: (lignes: LigneCommande[]) => void
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

    const ajouterLignesKit = (lignes: LigneCommande[]) => {
        setPanier(prev => {
            const mapPanier = new Map<number, LigneCommande>();
            
            for (const ligne of prev) {
                mapPanier.set(ligne.articleId, { ...ligne });
            }
            
            for (const ligne of lignes) {
                if (mapPanier.has(ligne.articleId)) {
                    const existante = mapPanier.get(ligne.articleId)!;
                    existante.quantiteLigne += ligne.quantiteLigne;
                    existante.prixTotal += ligne.prixTotal;
                    mapPanier.set(ligne.articleId, existante);
                } else {
                    mapPanier.set(ligne.articleId, { ...ligne });
                }
            }

            return Array.from(mapPanier.values());
        });
    };


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
        <PanierContext.Provider value={{
            panier, 
            ajouterLigne, 
            supprimerLigne, 
            viderPanier, 
            estVide, 
            articleExiste, 
            modifierQuantiteLigne,
            ajouterLignesKit
        }}>
            {children}
        </PanierContext.Provider>
    )
}