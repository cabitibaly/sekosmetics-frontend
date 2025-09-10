import { Mail } from "lucide-react"
import axios from "axios";
import { baseUrl } from "@/constant/baseUrl";
import { toast } from "react-toastify";
import { useState } from "react";
import { couleurNotif } from "@/utils/couleurNotif";
import { NotificationField } from "@/types/notificationField";

interface NotificationCardProps {
    notification: NotificationField;
    refetch: () => void;
}

const NotificationCard = ({notification, refetch}: NotificationCardProps) => {
    const [isLoading, setIsLoading] = useState(false)

    const modifierNotif = () => {
        setIsLoading(true)

        axios.patch(
            `${baseUrl}/notification/modifer/${notification.idNotification}`,
            { estLu: true },
            { withCredentials: true}
        ).then((res) => {
            if(res.status === 200) {
                toast.success(
                    "Marquer comme lu",
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                )
                refetch()
            }            
        }).catch(() => {
            toast.error(
                "Quelque chose s'est mal passé",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            )
        }).finally(() => {setIsLoading(false)})
    }

    const SupprimerNotif = () => {
        setIsLoading(true)

        axios.delete(
            `${baseUrl}/notification/supprimer/${notification.idNotification}`,
            { withCredentials: true}
        ).then((res) => {
            if(res.status === 200) {
                toast.success(
                    "Notification supprimée",
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                )
                refetch()
            }            
        }).catch(() => {
            toast.error(
                "Quelque chose s'est mal passé",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            )
        }).finally(() => {setIsLoading(false)})
    }

    return (
        <div className="relative border-b border-gris-6 p-4 w-full flex items-start justify-center gap-4">
            <div className={`size-10 aspect-square rounded-full flex items-center justify-center ${couleurNotif(notification.type)}`}>
                <Mail strokeWidth={1.5} className="size-6 stroke-violet-1" />
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-1">
                <span className="text-gris-12 text-base text-left font-bold">{notification.titre}</span>
                <span className="text-base text-left text-gris-12 font-normal">{notification.message}</span>
                <span className="text-base text-left text-gris-8 font-normal">{new Date(notification.dateCreationNotification || "").toLocaleString("fr-FR", {day: "2-digit", month: "long", year: "numeric"})}</span>
                <div className="w-full flex items-center justify-start gap-4">
                    <button disabled={isLoading} onClick={() => modifierNotif()} className={`cursor-pointer px-3 py-1.5 bg-bleu-4 rounded-lg text-base text-bleu-9 font-medium transition duration-200 hover:bg-bleu-4/50 max-md:text-sm max-xs:px-2 ${notification.estLu ? "hidden" : ""}`}>
                        Marquer comme lu
                    </button>
                    <button disabled={isLoading} onClick={() => SupprimerNotif()} className="cursor-pointer px-3 py-1.5 bg-rouge-4 rounded-lg text-base text-rouge-9 font-medium transition duration-200 hover:bg-rouge-4/50 max-md:text-sm max-xs:px-2">
                        Supprimer
                    </button>
                </div>
            </div>            
            <div className={`absolute top-6 right-4 ${notification.estLu ? "hidden" : ""}`}>
                <div className="rounded-full size-2.5 bg-bleu-9" />
            </div>
        </div>
    )
}

export default NotificationCard
