import { useQuery } from "@tanstack/react-query"
import { baseUrl } from "@/constant/baseUrl"
import axios from "axios"
import type { AdresseLivraison, ClientCommande, CommandeField, HistoriqueStatut, LigneCommande, utilisationCodePromo } from "@/types/commandeField"

const path = `${baseUrl}/commande`

interface CommandesFetchResponse {
    commandes: CommandeField[],
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

export const useGetLesCommandes = (query?: string) => {
    const url = query ? `${path}/rechercher?numeroCommande=${query}` : `${path}/toutes-les-commandes`

    const { data, isLoading, isError, refetch } = useQuery<CommandesFetchResponse>({
        queryKey: ["commandes", query],
        queryFn: async () =>  (
            axios.get(
                url,
                {withCredentials: true},                
            ).then(res => res.data)
        ),
        staleTime: 5 * 60 * 1000
    })

    return {
        commandes: data?.commandes || [],
        isLoading,
        isError,
        refetch
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