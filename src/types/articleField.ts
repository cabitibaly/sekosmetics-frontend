import z from "zod"

export const articleSchema = z.object({
    idArticle: z.number().optional(),
    nomArticle: z.string().min(1, {message: "Le nom de l'article est obligatoire"}),
    descriptionArticle: z.string().optional(),
    categorieId: z.number().optional(),
    marqueId: z.number().optional(),
    poids: z.string().optional(),
    largeur: z.string().optional(),
    longueur: z.string().optional(),
    reductionArticle: z.number().int().nonnegative({message: "Un nombre positif est requis"}).optional(),
    typeReductionArticle: z.string().optional(),
    notationArticle: z.number().optional(),
    dateCreationArticle: z.string().optional(),
    dateModificationArticle: z.string().optional(),
})

export type ArticleField = z.infer<typeof articleSchema>

export interface ImageArticle {
    idImage?: number
    urlImage: string
}

export interface ArticleFetch extends ArticleField {
    estReductionActive: boolean;
    categorie: {
        libelleCategorie: string
    },
    marque: {
        libelleMarque: string
    },
    imagesArticle: ImageArticle[]
}

export interface ArticleAvecVarianteSimple {
    idArticle: number,
    nomArticle: string,
    estReductionActive: boolean,
    reductionArticle: number,
    typeReductionArticle: string | null,
    dateCreationArticle: string,
    dateModificationArticle: string,
    notationArticle: number,
    imagesArticle: ImageArticle[],
    variantes: {
        idVariante: number,
        prixVente: number,
        quantiteVariante: number
    }[]
}

export interface FavorisArticle extends ArticleAvecVarianteSimple {
    idFavori: number,
    clientId: number,
    articleId: number,
}

export interface Commentaire {
    idAvis: number,
    commentaire: string,
    dateCreationAvis: string,
    notation: number,
    utiliteur: {
        nomClient: string,
        prenomClient: string,
        img: string | null
    }
}