import { baseUrl } from "@/constant/baseUrl";
import { Code } from "@/types/codeField";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const path = `${baseUrl}/code-promo`

interface CodesFetchResponse {
    codePromo: Code,
    status: number
}

export const useGetUnCode = (recherche: string) => {
    const { data, isLoading, isError, error, refetch }= useQuery<CodesFetchResponse>({
        queryKey: ["code", recherche],
        queryFn: () => (
            axios.get(
                `${path}/rechercher?code=${recherche}`,
                {withCredentials: true}
            ).then(res => res.data)
            .catch(err => {
                toast.error(
                    err.response?.data?.message || "Une erreur est survenue",
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,                        
                    }
                )
                return null
            })
        ),
        enabled: false,
        staleTime: Infinity,
    })    

    return {
        code: data?.codePromo,
        isLoading,
        isError,
        error,
        refetch
    }
}