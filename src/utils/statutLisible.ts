export const statutLisible = (statut: string) => {
    switch (statut) {
        case "CREEE":
            return "Créé";
        case "CONFIRMEE":
            return "Confirmé";
        case "EXPEDIEE":
            return "Expédié";
        case "ANNULEE":
            return "Annulé";
        case "LIVREE":
            return "Livré";
        default:
            return "";
    }
}

export const statutRetourLisible = (statut: string) => {
    switch (statut) {
        case "EN_ATTENTE":
            return "En attente";
        case "APPROUVE":
            return "Approuvé";
        case "ANNULE":
            return "Annulé";
        default:
            return "";
    }
}

export const couleurStatut = (statut: string) => {
    switch (statut) {
        case "CREEE":
            return "bg-bleu-4/60 text-bleu-9";
        case "CONFIRMEE":
            return "bg-jaune-4/60 text-jaune-9";
        case "EXPEDIEE":
            return "bg-orange-4/60 text-orange-9";
        case "ANNULEE":
            return "bg-rouge-4/60 text-rouge-9";
        case "LIVREE":
            return "bg-vert-4/60 text-vert-9";
        default:
            return "";
    }
}

export const couleurStatutRetour = (statut: string) => {
    switch (statut) {
        case "EN_ATTENTE":
            return "bg-bleu-4/60 text-bleu-9";
        case "APPROUVE":
            return "bg-vert-4/60 text-vert-9";
        case "ANNULE":
            return "bg-rouge-4/60 text-rouge-9";
        default:
            return "";
    }
}

export const typeReductionLisible = (type: string): string => {
    switch (type) {
        case "POURCENTAGE":
            return "Pourcentage";
        case "MONTANT_FIXE":
            return "Montant fixe";
        case "LIVRAISON_GRATUITE":
            return "Livraison gratuite";
        default:
            return "";
    }
}