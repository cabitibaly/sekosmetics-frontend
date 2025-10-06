import { useInfiniteQuery } from "@tanstack/react-query";
import { baseUrl } from "../../constant/baseUrl";
import axios from "axios";
import type { OffreField } from "../../types/offreField";
import { ArticleAvecVarianteSimple } from "@/types/articleField";

const path = `${baseUrl}/offre-promotionnelle`

interface OffresFetchResponse {
    offresPromo: OffreField[],
    hasMore: boolean,
    status: 200
}

interface OffreAvecArticleId extends OffreField {
    articlesOffre: {
        articleId: number
    }[]
}

interface OffreFetchResponse {
    articles: ArticleAvecVarianteSimple[],
    hasMore: boolean,
    offrePromo: {
        idOffre: number,
        intituleOffre: string,
        imageOffre: string,
        typeReductionOffre: string,
        valeurReductionOffre: number,
        estActive: boolean
    },
    status: number
}

export const useGetLesOffres = () =>  {

    const { data, isLoading, isError, refetch, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<OffresFetchResponse>({
        queryKey: ["offres"],
        initialPageParam: 1,
        queryFn: async ({pageParam}) => (
            axios.get(
                `${path}/toutes-les-offres-client?limit=8&page=${pageParam}`,
                {withCredentials: true}
            ).then(res => res.data)
        ),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasMore) {                
                return lastPage.hasMore ? allPages.length + 1 : undefined
            }
            return undefined
        },
        staleTime: 1000 * 60 * 30 // 5 minutes
    })

    return {
        offres: data?.pages.flatMap(page => page.offresPromo) || [],
        isLoading,
        isError,
        refetch,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    }
}

export const useGetUneOffre = (idOffre: number) =>  {

    const { data, isLoading, isError, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery<OffreFetchResponse>({
        queryKey: ["offre", idOffre],
        initialPageParam: 1,
        queryFn: async ({pageParam}) => (
            axios.get(
                `${path}/toutes-les-offres-client/${idOffre}?page=${pageParam}&limit=8`,
                {withCredentials: true}
            ).then(res => res.data)
        ),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasMore) {                
                return lastPage.hasMore ? allPages.length + 1 : undefined
            }
            return undefined
        },
        enabled: !!idOffre,
        staleTime: 30 * 60 * 1000
    })

    return {
        articles: data?.pages.flatMap(page => page.articles) || [],
        offre: data?.pages[0]?.offrePromo || null,
        isLoading,
        isError,
        refetch,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    }
}