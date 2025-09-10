import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { baseUrl } from "@/constant/baseUrl";
import axios from "axios";
import { ArticleAvecVariante, ArticleAvecVarianteSimple, Commentaire, FavorisArticle } from "@/types/articleField";
import { useAuth } from "../useAuth";
import { VarianteResponseObject } from "@/types/requestVarianteObject";

const path = `${baseUrl}/article`;

interface ArticlesFetchResponse {
    status: number;
    articles: ArticleAvecVarianteSimple[];
    hasMore: boolean;
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

interface VarianteFetchResponse {
    variantes: VarianteResponseObject[],
    hasMore: boolean,
    status: number
}

interface RatingCount {
  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
}

export const useGetLesArticles = (categorieId?: string, marqueId?: string, nomArticle?: string, prixMin?: string, prixMax?: string) => {      

    const { data, isLoading, refetch, isError } = useQuery<ArticlesFetchResponse>({
        queryKey: ["articles", categorieId, marqueId, nomArticle, prixMin, prixMax],
        queryFn: async () => (
            axios.get(
                `${path}/tous-les-articles-client?categorieId=${categorieId}&marqueId=${marqueId}&nomArticle=${nomArticle}&prixMin=${prixMin}&prixMax=${prixMax}`,
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

export const useGetLesArticlesPagine = (
    limit: number = 8, 
    categorieId?: string, 
    marqueId?: string, 
    nomArticle?: 
    string, 
    prixMin?: 
    string, 
    prixMax?: string
) => {
    const { data, isLoading, isError, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery<ArticlesFetchResponse>({
        queryKey: ["articles", categorieId, marqueId, nomArticle, prixMin, prixMax],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => {
            const res = await axios.get(`${path}/tous-les-articles-client?page=${pageParam}&limit=${limit}&categorieId=${categorieId}&marqueId=${marqueId}&nomArticle=${nomArticle}&prixMin=${prixMin}&prixMax=${prixMax}`);
            return res.data
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasMore) {                
                return lastPage.hasMore ? allPages.length + 1 : undefined
            }
            return undefined
        },
        staleTime: 30 * 60 * 1000,
    })

    return {
        articles: data?.pages.flatMap(page => page.articles) || [],
        isLoading,
        isError,
        refetch,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    }
}

export const useGetUnArticles = (idArticle: number | null) => {
    const { data, isLoading, refetch, isError } = useQuery<ArticleFetchResponse>({
        queryKey: ["article", idArticle],
        queryFn: async () => (
            axios.get(
                `${path}/tous-les-articles-client/${idArticle}`,
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

export const useGetLesVariantes = (limit: number = 8, articleId?: number) => {
    const { data, isLoading, refetch, isError, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<VarianteFetchResponse>({
        queryKey: ["variantes", articleId],
        initialPageParam: 1,
        queryFn: async ({pageParam}) => (
            axios.get(
                `${path}/${articleId}/variante/toutes-les-variantes-client?page=${pageParam}&limit=${limit}`,
                {withCredentials: true}
            ).then(res => res.data)
        ),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasMore) {                
                return lastPage.hasMore ? allPages.length + 1 : undefined
            }
            return undefined
        },
        staleTime: 15 * 60 * 1000
    })    

    return {
        variantes: data?.pages.flatMap(page => page.variantes) || [],
        isLoading,
        refetch,
        isError,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage
    }
}

export const useGetLesFavoris = () => {
    const { isAuthenticated } = useAuth()

    const { data, isLoading, isError, refetch } = useQuery<FavorisArticlesFetchResponse>({
        queryKey: ["favoris"],
        queryFn: async () => (
            axios.get(
                `${path}/favoris/tous-les-articles`,
                {withCredentials: true}
            ).then(res => res.data)
        ),
        staleTime: 60 * 60 * 1000,
        enabled: isAuthenticated
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
    });

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

export const useGetNouvelleArrivage = (limit: number = 8, query?: string) => {
    const { data, isLoading, isError, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<ArticlesFetchResponse>({
        queryKey: ["nouvelle-arrivage", query],
        initialPageParam: 1,
        queryFn: async ({pageParam}) => (
            axios.get(
                `${path}/nouvelle-arrivage?page=${pageParam}&limit=${limit}&nomArticle=${query ? query : ""}`,
                {withCredentials: true}
            ).then(res => res.data)
        ),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasMore) {                
                return lastPage.hasMore ? allPages.length + 1 : undefined
            }
            return undefined
        },
        staleTime: 60 * 60 * 1000
    })

    return {
        articles: data?.pages.flatMap(page => page.articles) || [],
        isLoading,
        isError,
        refetch,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage        
    }
}

export const useGetBestseller = (limit: number = 8, query?: string) => {
    const { data, isLoading, isError, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery<ArticlesFetchResponse>({
        queryKey: ["bestseller", query],
        initialPageParam: 1,
        queryFn: async ({pageParam}) => (
            axios.get(
                `${path}/les-plus-vendus?page=${pageParam}&limit=${limit}&nomArticle=${query ? query : ""}`,
                {withCredentials: true}
            ).then(res => res.data)
        ),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasMore) {                
                return lastPage.hasMore ? allPages.length + 1 : undefined
            }
            return undefined
        },
        staleTime: 60 * 60 * 1000
    })

    return {
        articles: data?.pages.flatMap(page => page.articles) || [],
        isLoading,
        isError,
        refetch,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    }
}