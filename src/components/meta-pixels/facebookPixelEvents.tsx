"use client"
import { usePathname } from "next/navigation"
import { useEffect } from "react";

declare global {
  interface Window {
    fbq: (...args: any[]) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

const FacebookPixelEvents = () => {
    const pathname = usePathname();

    useEffect(() => {

        if(typeof (window).fbq === "function") {
            window.fbq("track", "PageView");
        }

    }, [pathname])

    return null;
}

export default FacebookPixelEvents
