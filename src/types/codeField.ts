export interface Code {
    code: string;
    dateDebutCode: Date;
    dateFinCode: Date;
    valeurReductionCode: number;
    typeReductionCode: string;
    idCode?: number | undefined;
    descriptionCode?: string | undefined;
    estActif?: boolean | undefined;
    utilisationMax?: number | undefined;
    utilisationTotal?: number | undefined;
}