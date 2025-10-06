import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { baseUrl } from "@/constant/baseUrl"
import axios from "axios"
import type { AdresseLivraison, ClientCommande, CommandeField, HistoriqueStatut, LigneCommande, utilisationCodePromo } from "@/types/commandeField"

const path = `${baseUrl}/commande`

interface CommandesFetchResponse {
    commandes: CommandeField[],
    hasMore: boolean,
    status: number
}

interface CommandeFullField extends CommandeField {
    lignesCommande: LigneCommande[],
    historiquesStatut: HistoriqueStatut[],
    client: ClientCommande, 
    adresseL: AdresseLivraison,
    utilisationsCodePromo: utilisationCodePromo[]
}

interface CommandeFetchResponse {
    status: number,
    commande: CommandeFullField
}

export const useGetLesCommandes = (limit: number = 8, numeroCommande?: string) => {    

    const { data, isLoading, isError, refetch, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<CommandesFetchResponse>({
        queryKey: ["commandes", numeroCommande],
        initialPageParam: 1,
        queryFn: async ({pageParam}) => (
            axios.get(
                `${path}/toutes-les-commandes`,
                {
                    withCredentials: true,
                    params: {
                        numeroCommande,
                        limit,
                        page: pageParam
                    }
                },                
            ).then(res => res.data)
        ),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasMore) {                
                return lastPage.hasMore ? allPages.length + 1 : undefined
            }
            return undefined
        },
        staleTime: 5 * 60 * 1000
    })

    return {
        commandes: data?.pages.flatMap(page => page.commandes) || [],
        isLoading,
        isError,
        refetch,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    }
}

export const useGetUneCommande = (id: number | null) => {
    const { data, isLoading, isError, refetch } = useQuery<CommandeFetchResponse>({
        queryKey: ["commande", id],
        queryFn: async () => (
            axios.get(
                `${path}/toutes-les-commandes/${id}`,
                { withCredentials: true }
            ).then(res => res.data)
        ),
        staleTime: 5 * 60 * 1000,
        enabled: !!id
    })    

    return {
        commande: data?.commande || null,
        client: data?.commande.client || null,
        adresseLivraison: data?.commande.adresseL || null,
        lignesCommande: data?.commande.lignesCommande || [],
        historiqueStatut: data?.commande.historiquesStatut || [],
        utilisationsCodePromo: data?.commande.utilisationsCodePromo[0]?.code || null,
        isLoading,
        isError,
        refetch
    }
}