import { PanierContext } from "@/contexts/panierContext"
import { useContext } from "react"

export const usePanier = () => {
    const context = useContext(PanierContext)

    if (!context) {
        throw new Error("Un problème est survenu lors de l'utilisation de usePanier");        
    }

    return {
        panier: context.panier,
        ajouterLigne: context.ajouterLigne,
        supprimerLigne: context.supprimerLigne,
        viderPanier: context.viderPanier,
        estVide: context.estVide,
        articleExiste: context.articleExiste,
        modifierQuantiteLigne: context.modifierQuantiteLigne
    }
}