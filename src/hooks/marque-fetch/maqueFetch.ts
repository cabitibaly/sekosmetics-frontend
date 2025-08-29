import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../constant/baseUrl";
import type { MarqueField } from "../../types/marqueField";

const path = `${baseUrl}/marque`;

interface marquesFetchResponse {
    status: number;
    marques: MarqueField[];
}

interface MarqueFetchResponse {
    status: number;
    marque: MarqueField;
}

export const useGetLesMarques = (query?: string) => {
    const url = query ? `${path}/rechercher-une-marque?libelle=${query}` : `${path}/toutes-les-marques`;    

    const { data, isLoading, isError, refetch } = useQuery<marquesFetchResponse>({
        queryKey: ["marques", query],
        queryFn: async () => (
            axios.get(
                url,
                { withCredentials: true }
            ).then(res => {
                if(res.data.status === 200) {                    
                    return res.data;
                }
                return { status: 404, marques: [] };
            })
        ),
        staleTime: 60 * 60 * 1000,        
    })

    return {
        marques: data?.marques || [],
        isLoading,
        isError,
        refetch
    }
}

export const useGetUneMarque = (idMarque: number | null) => {          
    
    const { data, isLoading, isError, refetch } = useQuery<MarqueFetchResponse>({
        queryKey: ["marque", idMarque],
        queryFn: async () => (
            axios.get(
                `${path}/toutes-les-marques/${idMarque}`,
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