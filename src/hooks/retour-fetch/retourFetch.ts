import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { baseUrl } from "../../constant/baseUrl"
import axios from "axios"
import type { LigneRetour, RetourField } from "../../types/retourFiels"

const path = `${baseUrl}/retour`

interface RetoursFetchResponse {
    retours: RetourField[],
    hasMore: boolean,
    status: number
}

interface RetourAvecCommande extends RetourField {    
    ligneCommande: LigneRetour,
    preuves: {
        urlPreuve: string,
    }[]
}

interface RetourFetchResponse {
    retour: RetourAvecCommande,
    status: number
}

export const useGetLesRetours = (limit: number = 8, numeroRetour?: string) => {    

    const { data, isLoading, isError, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery<RetoursFetchResponse>({
        queryKey: ["retours", numeroRetour],
        initialPageParam: 1,
        queryFn: async ({pageParam}) => (
            axios.get(
                `${path}/tous-les-retours/`,
                {
                    withCredentials: true,
                    params: {
                        numeroRetour,
                        limit,
                        page: pageParam
                    }
                }
            ).then(res => res.data)
        ),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasMore) {                
                return lastPage.hasMore ? allPages.length + 1 : undefined
            }
            return undefined
        },
        staleTime: 1000 * 60 * 5
    })

    return {
        retours: data?.pages.flatMap(page => page.retours) || [],
        isLoading,
        isError,
        refetch,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage
    }
}

export const useGetUnRetour = (retourId: number) => {

    const { data, isLoading, isError, refetch } = useQuery<RetourFetchResponse>({
        queryKey: ["retour", retourId],
        queryFn: async () => (
            axios.get(
                `${path}/tous-les-retours/${retourId}`,
                {withCredentials: true}
            ).then(res => res.data)
        ),
        staleTime: 1000 * 60 * 5
    })

    return {
        retour: data?.retour || null,
        commande: data?.retour.ligneCommande.commande || null,
        client: data?.retour.ligneCommande.commande.client || null,
        ligneCommande: data?.retour.ligneCommande || null,
        isLoading,
        isError,
        refetch
    }
}