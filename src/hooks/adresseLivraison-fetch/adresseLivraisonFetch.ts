import { baseUrl } from "@/constant/baseUrl";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const path =`${baseUrl}/adresse`

interface AdresseLivraison {
    idAdressL: number,
    pays: string,
    ville: string,
    commune: string,
    quartier: string,
    estAdresseParDefaut: true
}

interface AdressesFetchResponse {
    adresses: AdresseLivraison[],
    status: number
}

export const useGetLesAdresses = () => {
    const { data, isLoading, isError, refetch } = useQuery<AdressesFetchResponse>({
        queryKey: ["adressesLivraison"],
        queryFn: () => (
            axios.get(
                `${path}/toutes-les-adresses`,
                {withCredentials: true}
            ).then(res => res.data)
        ),
        staleTime: 30 * 60 * 1000,
    })

    return {
        adresses: data?.adresses || [],
        isLoading,
        isError,
        refetch
    }
}