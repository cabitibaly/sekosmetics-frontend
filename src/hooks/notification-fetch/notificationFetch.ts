import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../constant/baseUrl";
import axios from "axios";
import type { NotificationField } from "../../types/notificationField";

const path = `${baseUrl}/notification`;

interface NotificationFetchResponse {
    notifications: NotificationField[];
    status: number;
}

export const useGetLesNotifications = () => {
    const { data, isLoading, isError, refetch } = useQuery<NotificationFetchResponse>({
        queryKey: ["notifications"],
        queryFn: async () => (
            axios.get(
                `${path}/toutes-les-notifs`,
                { withCredentials: true }
            ).then((res) => res.data)
        ),
        staleTime: 15 * 60 * 1000,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    })

    return {
        notifications: data?.notifications || [],
        isLoading,
        isError,
        refetch
    }
}