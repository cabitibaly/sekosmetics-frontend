import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import type { Country } from "@/types/countryField";

interface RestCountry {
  cca2: string;
  name: {
    common: string;
    official: string;
  };
  translations?: {
    fra?: {
      common: string;
      official: string;
    };
  };
  flags: {
    png: string;
    svg: string;
  };
  idd?: {
    root?: string;
    suffixes?: string[];
  };
}

interface RestCity {
    error: false;
    msg: string;
    data: string[];
}

export const useGetPays = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["pays"],
        queryFn: async () => (
            axios.get(
                "https://restcountries.com/v3.1/all?fields=translations,name,cca2,flags"
            ).then(res => res.data)
        ),
        staleTime: Infinity,
    })

    const formatted: Country[] = data ? 
        data?.map((country: RestCountry) => ({
            code: country.cca2,
            nameFr: country.translations?.fra?.common ?? country.name.common,
            nameEn: country.name.common, // anglais
            flag: country.flags.png,
        })) : [];

    formatted.sort((a, b) => a.nameFr.localeCompare(b.nameFr, "fr"));

    return {
        countries: formatted || [],
        isLoading
    }
}

export const useGetVille = (paysEn: string) => {
    const { data: villes, isLoading } = useQuery<RestCity>({
        queryKey: ["ville", paysEn],
        queryFn: async () => (
            axios.post(
                "https://countriesnow.space/api/v0.1/countries/cities",
                { country: paysEn }
            ).then(res => res.data)
        ),
        staleTime: Infinity,
        enabled: !!paysEn,
    })

    return {
        villes: villes?.data || [],
        erreur: villes?.error,
        isLoading
    }
}