export interface CommandeField {
    idCommande?: number,
    numeroCommande: string,
    statutCommande: string
    montantTotal: number,
    fraisDeLivraison: number,
    reductionCommande: number,
    dateCreationCommande: string,
    dateModificationCommande: string,
    clientId: number,
    client: ClientCommande
}

export type LigneCommande = {
    idLigne?: number,
    quantiteLigne: number,
    prixUnitaire: number,
    prixTotal: number,
    article: {
        imageVariante: string,
        valeursOption: {
            idValeur: number,                
            valeurOption: string,
        }[],
        article: {
            nomArticle: string,
            imagesArticle: {
                urlImage: string
            }[],
            categorie: {
                libelleCategorie: string
            }
        }
    }
}

export type HistoriqueStatut = {
    idHistorique?: number,
    statutPrecedent: string,
    statutActuel: string,
    dateChangement: string
}

export type ClientCommande = {
    nomClient: string,
    prenomClient: string,
    email?: string,
    telephone?: string,
    img: string | null    
}

export type AdresseLivraison = {
    idAdressL: number,
    pays: string,
    ville: string,
    commune: string,
    quartier: string
}

export interface utilisationCodePromo {
    code: {
        code: string,
        typeReductionCode: string,
        valeurReductionCode: number
    }
}
