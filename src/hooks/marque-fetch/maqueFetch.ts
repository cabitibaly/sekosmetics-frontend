import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../constant/baseUrl";
import type { MarqueField } from "../../types/marqueField";

const path = `${baseUrl}/marque`;

interface marquesFetchResponse {
    status: number;
    hasMore: boolean;
    marques: MarqueField[];
}

interface MarqueFetchResponse {
    status: number;
    marque: MarqueField;
}

export const useGetLesMarques = (limit: number = 8, query?: string) => {    

    const { data, isLoading, isError, refetch, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<marquesFetchResponse>({
        queryKey: ["marques", query],
        initialPageParam: 1,
        queryFn: async ({pageParam}) => (
            axios.get(
                `${path}/toutes-les-marques-client?page=${pageParam}&limit=${limit}&libelle=${query || ""}`,
                { withCredentials: true }
            ).then(res => {
                if(res.data.status === 200) {                    
                    return res.data;
                }
                return { status: 404, marques: [] };
            })
        ),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasMore) {                
                return lastPage.hasMore ? allPages.length + 1 : undefined
            }
            return undefined
        },
        staleTime: 60 * 60 * 1000,        
    })

    return {
        marques: data?.pages.flatMap(page => page.marques) || [],
        isLoading,
        isError,
        refetch,
        isFetchingNextPage,
        hasNextPage, 
        fetchNextPage
    }
}

export const useGetUneMarque = (idMarque: number | null) => {          
    
    const { data, isLoading, isError, refetch } = useQuery<MarqueFetchResponse>({
        queryKey: ["marque", idMarque],
        queryFn: async () => (
            axios.get(
                `${path}/toutes-les-marques-client/${idMarque}`,
                { withCredentials: true }
            ).then(res => {                
                if(res.data.status === 200) {                    
                    return res.data;
                }
                return [];
            })
        ),
        staleTime: 60 * 60 * 1000,
        enabled: idMarque !== null        
    })

    return {
        marque: data?.marque,
        isLoading,
        isError,
        refetch
    }
}