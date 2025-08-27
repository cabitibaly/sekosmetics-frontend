export type ArticleCardType = {
    id: number,
    nom: string,
    image: string, 
    prix: number,
    notaion: number,
    estFavori?: boolean,
    refechFavoris?: () => void,
    idFavoris?: number
}