export type ArticleCardType = {
    id: number,
    nom: string,
    image: string, 
    prix: number,
    notaion: number,
    estFavori?: boolean,
    refechFavoris?: () => void,
    idFavoris?: number,
    reduction?: {
        type: string | null | undefined,
        valeur: number | null | undefined,
        estActive: boolean | null | undefined
    }
}