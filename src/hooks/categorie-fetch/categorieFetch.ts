import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../constant/baseUrl";
import { CategorieField } from "@/types/categorieField";

const path = `${baseUrl}/categorie`;

interface CategoriesFetchResponse {
    status: number;
    categories: CategorieField[];
    hasMore: boolean;
}
interface CategorieFetchResponse {
    status: number;
    categorie: CategorieField;
}

export const useGetLesCategories = (query?: string, page?: number, limit?: number) => {
    const url = query ? `${path}/rechercher-une-categorie-client?libelle=${query}` : `${path}/toutes-les-categories-client?page=${page}&limit=${limit}`;    

    const { data, isLoading, isError, refetch } = useQuery<CategoriesFetchResponse>({
        queryKey: ["categories", query],
        queryFn: async () => (
            axios.get(
                url,
                { withCredentials: true }
            ).then(res => {
                if(res.data.status === 200) {                    
                    return res.data;
                }
                return { status: 404, categories: [] };
            })
        ),
        staleTime: 60 * 60 * 1000,            
    },)

    return {
        categories: data?.categories || [],
        hasMore: data?.hasMore || false,
        isLoading,
        isError,
        refetch
    }
}

export const useGetLesCategoriesPagine = (limit: number = 8, libelle?: string) => {
    const { data, isLoading, isError, refetch, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery<CategoriesFetchResponse>({
        queryKey: ["categories", libelle],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => {
            const res = await axios.get(`${path}/toutes-les-categories-client?page=${pageParam}&limit=${limit}&libelle=${libelle || ""}`, { withCredentials: true });
            return res.data
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasMore) {                
                return lastPage.hasMore ? allPages.length + 1 : undefined
            }
            return undefined
        },
    })

    return {
        categories: data?.pages.flatMap(page => page.categories) || [],        
        isLoading,
        isError,
        refetch,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    }
}

export const useGetUneCategorie = (idCategorie: number | null) => {          
    
    const { data, isLoading, isError, refetch } = useQuery<CategorieFetchResponse>({
        queryKey: ["categorie", idCategorie],
        queryFn: async () => (
            axios.get(
                `${path}/toutes-les-categories-client/${idCategorie}`,
                { withCredentials: true }
            ).then(res => {                
                if(res.data.status === 200) {                    
                    return res.data;
                }
                return [];
            })
        ),
        staleTime: 60 * 60 * 1000,
        enabled: idCategorie !== null        
    })

    return {
        categorie: data?.categorie,
        isLoading,
        isError,
        refetch
    }
}