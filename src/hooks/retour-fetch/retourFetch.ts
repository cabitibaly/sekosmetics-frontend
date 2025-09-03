import { useQuery } from "@tanstack/react-query"
import { baseUrl } from "../../constant/baseUrl"
import axios from "axios"
import type { LigneRetour, RetourField } from "../../types/retourFiels"

const path = `${baseUrl}/retour`

interface RetoursFetchResponse {
    retours: RetourField[],
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

export const useGetLesRetours = (filter?: { statutRetour?: string, date?: string, numeroRetour?: string }) => {    

    const { data, isLoading, isError, refetch } = useQuery<RetoursFetchResponse>({
        queryKey: ["retours", filter],
        queryFn: async () => (
            axios.get(
                `${path}/tous-les-retours/`,
                {
                    withCredentials: true,
                    params: filter
                }
            ).then(res => res.data)
        ),
        staleTime: 1000 * 60 * 5
    })

    return {
        retours: data?.retours || [],
        isLoading,
        isError,
        refetch
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