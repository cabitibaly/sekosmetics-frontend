import { useEffect } from "react";

interface useHideOnScroll {
    dernierePosition: number;
    setDernierePosition: (position: number) => void;    
    setVisible: (visible: boolean) => void; 
}

export const useHideOnScroll = ({ dernierePosition, setDernierePosition, setVisible }: useHideOnScroll) => {
    useEffect(() => {

      const handleScroll = () => {
        const scrollPosition: number = window.scrollY;

        if(scrollPosition > dernierePosition && scrollPosition > 100) {
          setVisible(false);
        } else {
          setVisible(true);
        }

        setDernierePosition(scrollPosition);
      }

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      }

    }, [dernierePosition, setDernierePosition, setVisible])
}