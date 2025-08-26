import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../constant/baseUrl";
import type { CategorieField } from "../../types/categorieField";

const path = `${baseUrl}/categorie`;

interface CategoriesFetchResponse {
    status: number;
    categories: CategorieField[];
}

interface CategorieFetchResponse {
    status: number;
    categorie: CategorieField;
}

export const useGetLesCategories = (query?: string) => {
    const url = query ? `${path}/rechercher-une-categorie?libelle=${query}` : `${path}/toutes-les-categories`;    

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
        enabled: query === undefined || query.length >= 1
    })

    return {
        categories: data?.categories || [],
        isLoading,
        isError,
        refetch
    }
}

export const useGetUneCategorie = (idCategorie: number | null) => {          
    
    const { data, isLoading, isError, refetch } = useQuery<CategorieFetchResponse>({
        queryKey: ["categorie", idCategorie],
        queryFn: async () => (
            axios.get(
                `${path}/toutes-les-categories/${idCategorie}`,
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