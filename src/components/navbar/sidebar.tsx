"use client"

import { useGetLesNotifications } from "@/hooks/notification-fetch/notificationFetch";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useHideOnScroll } from "@/utils/useHideOnScroll";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MoonLoader } from "react-spinners";
import NotificationCard from "../cards/notificationCard";

const Sidebar = () => {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [dernierePosition, setDernierePosition] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(true);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    useHideOnScroll({ dernierePosition, setDernierePosition, setVisible});
    const ref = useRef<HTMLDivElement>(null)  
    const { notifications, isLoading: isLoadingNotif, refetch } = useGetLesNotifications()

    useClickOutside(ref, () => setIsNotificationOpen(false), isNotificationOpen);

    const handleSidebarToglle = () => {
        setIsClicked(!isClicked);
    }

    useEffect(() => {

        if (isClicked || isNotificationOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

    }, [isClicked, isNotificationOpen])

    return (
        <>
            <div className={`fixed z-40 w-screen py-3 px-4 hidden items-center justify-between transition-transform ease-linear duration-200 ${visible ? "translate-y-2" : "-translate-y-full"} max-[896px]:flex`}>
                <div onClick={() => handleSidebarToglle()} className="size-10 flex items-center justify-center cursor-pointer">
                    <Image src={"/sidebar.svg"} width={40} height={40} alt="sidebar-btn"/>
                </div>
                <Link href={"/"} className="text-gris-12 text-2xl font-bold max-xl:text-lg">Sekosmetics</Link>
                <div onClick={() => setIsNotificationOpen(true)} className="relative size-10 flex items-center justify-center cursor-pointer">
                    <Image src={"/notification.svg"} width={40} height={40} alt="notification-btn"/>
                    <div className={`absolute top-[2px] right-[2px] size-2.5 bg-red-8 rounded-full ${notifications.some((notif) => !notif.estLu) ? "block" : "hidden"}`} />
                </div>                
            </div>
            <div onClick={() => handleSidebarToglle()} className={`fixed z-50 h-screen w-screen bg-gris-12/60 transition-transform ease-in-out duration-300 hidden items-start justify-start max-[896px]:flex ${isClicked ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="bg-red-1 w-1/2 h-full flex flex-col items-start justify-start gap-4 p-4 max-sm:w-2/3 max-xs:w-full">
                    <div className="w-full flex items-center justify-between">
                        <Link href={"/"} className="text-gris-12 text-2xl font-bold max-xl:text-lg">Sekosmetics</Link>
                        <div onClick={() => handleSidebarToglle()} className="cursor-pointer">
                            <X strokeWidth={2} className="text-red-8 size-6" />
                        </div>                        
                    </div>  
                    <div className="w-full flex flex-col items-start justify-between">
                        <Link href={"/article/nouvelle-arrivage"} className="pb-2 border-b border-gris-4 w-full text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 hover:border-red-8">Nouvelle arrivage</Link>
                        <Link href={"/categories"} className="py-2 border-b border-gris-4 w-full text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 hover:border-red-8">Categories</Link>
                        <Link href={"/marques"} className="py-2 border-b border-gris-4 w-full text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 hover:border-red-8">Marques</Link>
                        <Link href={"/offre-promotionnelle"} className="py-2 border-b border-gris-4 w-full text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 hover:border-red-8">Offres Promo</Link>
                        <Link href={"/recherche"} className="py-2 border-b border-gris-4 w-full text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 hover:border-red-8">Recherche</Link>
                    </div>                
                </div>
            </div>
            {
                isNotificationOpen &&
                <div ref={ref} className="fixed top-20 right-10 z-[1000] border border-gris-6 overflow-auto w-2/5 h-3/4 bg-red-2 rounded-2xl flex flex-col items-start justify-start max-xl:w-[45%] max-lg:w-3/5 max-896:top-16 max-sm:w-4/5 max-xs:h-screen max-xs:w-full max-xs:rounded-none max-xs:top-0 max-xs:right-0">                    
                        <div className="sticky top-0 z-10 bg-red-2 border-b border-gris-6 p-4 w-full flex items-center justify-between gap-6">
                            <span className="text-xl text-gris-12 font-medium">Notification</span>
                            <button onClick={() => setIsNotificationOpen(!isNotificationOpen)} className="cursor-pointer">
                                <X strokeWidth={1.5} className="size-6 stroke-gris-12"/>
                            </button>
                        </div>
                        {
                            isLoadingNotif &&
                                <div className="w-full h-64 flex items-center justify-center">
                                    <MoonLoader
                                        color="#C28BF9"
                                        size={24}
                                    />
                                </div>
                        }

                        {
                            notifications.length > 0 && !isLoadingNotif &&
                                notifications.map((notif) => (
                                    <NotificationCard 
                                        key={notif.idNotification}
                                        notification={notif}
                                        refetch={refetch}
                                    />
                                ))
                        }

                        {
                            notifications.length === 0 && !isLoadingNotif &&
                                <div className="w-full h-64 flex items-center justify-center">
                                    <span className="text-lg text-gris-12 font-medium">Aucune notification</span>
                                </div>
                        }
                </div>
            }
        </>
    )
}

export default Sidebar
