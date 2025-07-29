import { KitContext } from "@/contexts/kitContext"
import { useContext } from "react"

export const useKit = () => {
    const context = useContext(KitContext)

    if (!context) {
        throw new Error("Un problème est survenu lors de l'utilisation de useKit");        
    }

    return {
        kit: context.kit,
        ajouterLigneKit: context.ajouterLigneKit,
        supprimerLigneKit: context.supprimerLigneKit,
        viderKit: context.viderKit
    }
}
