import type React from "react";
import { useEffect } from "react";

export const useClickOutside = (ref: React.RefObject<HTMLElement | null>, handler: () => void, open: boolean) => {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler();
        };

        if (open) {
            document.addEventListener("mousedown", listener);
        }

        return () => {
            document.removeEventListener("mousedown", listener);
        };
    }, [ref, handler, open]);
}