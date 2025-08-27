import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "@/constant/baseUrl";
import axios from "axios";
import type { VarianteResponseObject } from "@/types/requestVarianteObject";
import { ArticleAvecVarianteSimple, ArticleFetch, Commentaire, FavorisArticle } from "@/types/articleField";

const path = `${baseUrl}/article`;

interface ArticleAvecVariante extends ArticleFetch {
    variantes: VarianteResponseObject[]
}

interface ArticlesFetchResponse {
    status: number;
    articles: ArticleAvecVarianteSimple[];
}

interface ArticleFetchResponse {
    status: number;
    article: ArticleAvecVariante;
}

interface FavorisArticlesFetchResponse {
    status: number;
    articlesFavoris: FavorisArticle[];
}

interface CommentairesFetchResponse {
    status: number;
    commentaires: Commentaire[];
}

interface RatingCount {
  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
}

export const useGetLesArticles = (categorieId?: string, marqueId?: string, nomArticle?: string) => {    
    
    const { data, isLoading, refetch, isError } = useQuery<ArticlesFetchResponse>({
        queryKey: ["articles", categorieId, marqueId, nomArticle],
        queryFn: async () => (
            axios.get(
                `${path}/tous-les-articles?categorieId=${categorieId}&marqueId=${marqueId}&nomArticle=${nomArticle}`,
                {withCredentials: true}
            ).then(res => {                
                if(res.data.status === 200) {
                    return res.data
                }
                return {status: 404, articles: []}
            })
        ),
        staleTime: 10 * 60 * 1000
    })    

    return {
        articles: data?.articles || [],
        isLoading,
        refetch,
        isError 
    }
}

export const useGetUnArticles = (idArticle: number | null) => {
    const { data, isLoading, refetch, isError } = useQuery<ArticleFetchResponse>({
        queryKey: ["article", idArticle],
        queryFn: async () => (
            axios.get(
                `${path}/tous-les-articles/${idArticle}`,
                {withCredentials: true}
            ).then(res => {
                if(res.data.status === 200) {
                    return res.data
                }
                return {status: 404, article: null}
            })
        ),
        enabled: !!idArticle,
        staleTime: 15 * 60 * 1000
    })        

    const tousLesOptions = data?.article.variantes.flatMap(v =>
        v.valeursOption.map(vo => vo.option)
    );    

    const seen = new Set<number>();
    const options = tousLesOptions?.filter(opt => {
        if (seen.has(opt.idOption)) return false;
        seen.add(opt.idOption);
        return true;
    });    

    return {
        article: data?.article || undefined,   
        options,    
        isLoading,
        refetch,
        isError
    }
}

export const useGetUneVariante = (articleId: number, varianteId: number) => {
    const { data, isLoading, refetch, isError } = useQuery({
        queryKey: ["variante", articleId, varianteId],
        queryFn: async () => (
            axios.get(
                `${path}/${articleId}/variante/toutes-les-variantes/${varianteId}`,
                {withCredentials: true}
            ).then(res => {
                if(res.data.status === 200) {
                    return res.data
                }
                return {status: 404, article: null}
            })
        ),
        staleTime: 10 * 60 * 1000
    })

    return {
        variante: data?.variante || null,
        isLoading,
        refetch,
        isError
    }
}

export const useGetLesFavoris = () => {
    const { data, isLoading, isError, refetch } = useQuery<FavorisArticlesFetchResponse>({
        queryKey: ["favoris"],
        queryFn: async () => (
            axios.get(
                `${path}/favoris/tous-les-articles`,
                {withCredentials: true}
            ).then(res => res.data)
        ),
        staleTime: 60 * 60 * 1000
    })
    
    return {
        favorisArticles: data?.articlesFavoris || [],
        isLoading,
        refetch,
        isError
    }
}

export const useGetLesCommentaireDeUnArticle = (articleId: number) => {
    const { data, isLoading, isError, refetch } = useQuery<CommentairesFetchResponse>({
        queryKey: ["commentaires", articleId],
        queryFn: async () => (
            axios.get(
                `${path}/${articleId}/avis/tous-les-commentaires/`,
                {withCredentials: true}
            ).then(res => res.data)
        ),
        staleTime: 60 * 60 * 1000
    })

    // const counts = data?.commentaires.reduce(
    //     (acc, c) => {
    //         acc[c.notation] = (acc[c.notation] || 0) + 1;
    //         return acc;
    //     },
    //     {} as Record<number, number>
    // );

    const initialCounts: RatingCount = {
        star1: 0,
        star2: 0,
        star3: 0,
        star4: 0,
        star5: 0,
    };

    const counts = data?.commentaires.reduce((acc, c) => {
        acc[`star${c.notation}` as keyof RatingCount]++;
        return acc;
    }, { ...initialCounts });

    return {
        commentaires: data?.commentaires || [],
        notations: counts,
        isLoading,
        isError,
        refetch
    }
}