export type optionType = {
    optionId: number;    
    valeurOption: string;
}

export interface OptionVariante {
    idOption: number,
    intituleOption: string,
    dateCreationOptionV: string,
    dateModificationOptionV: string
}

export type RequestVarianteObject = {
    id?: number;        
    quantiteVariante: number;
    prixVente: number;
    prixAchat?: number;
    imageVariante?: string;
    estVarianteParDefaut: boolean;
    estEnStock: boolean;  
    valeursOption: optionType[];  
};

export type VarianteResponseObject = {
    idVariante: number,                    
    prixAchat: number,
    prixVente: number,
    quantiteVariante: number,
    imageVariante: string,
    estVarianteParDefaut: boolean,
    estEnStock: boolean,
    valeursOption: {
        idValeur: number,                
        valeurOption: string,
        option: {
            idOption: number,
            intituleOption: string
        }
    }[]
}