import type { ClientCommande, LigneCommande } from "./commandeField";

export interface RetourField {
    idRetour: number;
    numeroRetour: string;
    raison: string;
    statutRetour: string;
    typeRemboursement: string;
    remboursement: number;
    dateCreationRetour: string;
    dateModificationRetour: string;
    ligneCommandeId: number;
}

export interface commandeRetour {
    idCommande?: number,
    numeroCommande: string,
    statutCommande: string
    montantTotal: number,
    dateCreationCommande: string,
    client: ClientCommande
}

export interface LigneRetour extends LigneCommande {
    commande: commandeRetour
}