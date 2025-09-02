export const appliquerReduction = (
    typeReductionCode: string | undefined, 
    valeur: number | undefined, 
    prixUnitaire: number | undefined,
    estReductionActive: boolean | undefined
): number => {

    if(!estReductionActive) return prixUnitaire!;
    
    switch (typeReductionCode) {
        case "LIVRAISON_GRATUITE":
            return prixUnitaire!;
        case "POURCENTAGE":
            return prixUnitaire! - prixUnitaire! * (valeur || 0) / 100;
        case "MONTANT_FIXE":
            return prixUnitaire! - (valeur || 0);
        default:
            return prixUnitaire!;
    }
}