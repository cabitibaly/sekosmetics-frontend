import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../constant/baseUrl";
import axios from "axios";
import type { OffreField } from "../../types/offreField";
import { ArticleAvecVarianteSimple } from "@/types/articleField";

const path = `${baseUrl}/offre-promotionnelle`

interface OffresFetchResponse {
    offresPromo: OffreField[],
    status: 200
}

interface OffreAvecArticleId extends OffreField {
    articlesOffre: {
        articleId: number
    }[]
}

interface OffreFetchResponse {
    articles: ArticleAvecVarianteSimple[],
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

    const { data, isLoading, isError, refetch } = useQuery<OffresFetchResponse>({
        queryKey: ["offres"],
        queryFn: async () => (
            axios.get(
                `${path}/toutes-les-offres-client/`,
                {withCredentials: true}
            ).then(res => res.data)
        ),
        staleTime: 1000 * 60 * 30 // 5 minutes
    })

    return {
        offres: data?.offresPromo || [],
        isLoading,
        isError,
        refetch
    }
}

export const useGetUneOffre = (idOffre: number) =>  {

    const { data, isLoading, isError, refetch } = useQuery<OffreFetchResponse>({
        queryKey: ["offre", idOffre],
        queryFn: async () => (
            axios.get(
                `${path}/toutes-les-offres-client/${idOffre}`,
                {withCredentials: true}
            ).then(res => res.data)
        ),
        enabled: !!idOffre,
        staleTime: 30 * 60 * 1000 // 5 minutes
    })

    return {
        articles: data?.articles || [],
        offre: data?.offrePromo || null,
        isLoading,
        isError,
        refetch
    }
}