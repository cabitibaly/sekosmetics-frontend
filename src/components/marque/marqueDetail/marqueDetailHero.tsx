"use client"
import Topbar from "@/components/navbar/topbar"
import { useGetUneMarque } from "@/hooks/marque-fetch/maqueFetch"
import Link from "next/link"

interface Props {
    id: string,
}

const MarqueDetailHero = ({id}: Props) => {
    const { marque } = useGetUneMarque(Number(id));

    return (
        <>
            <Topbar href='/marques' title={marque?.libelleMarque} />
            <section className="marque-hero overflow-x-hidden px-[150px] py-6 w-screen h-[50vh] flex flex-col items-center justify-center gap-4 max-2xl:px-[100px] max-xl:px-[60px] max-lg:h-[35vh] max-896:hidden">
                <div className="relative w-full h-3/5 flex items-center justify-center max-lg:h-1/2">
                    <div className="absolute top-0 left-0 flex items-center gap-2">
                        <Link href="/" className="text-base text-red-3 font-normal hover:underline">Accueil</Link>
                        <span className="text-base text-red-3 font-normal">/</span>
                        <Link href="/marques" className="text-base text-red-3 font-normal hover:underline">Marque</Link>
                        <span className="text-base text-red-3 font-normal">/</span>
                        <Link href={`/marques/${id}`} className="text-base text-red-3 font-normal hover:underline">{marque?.libelleMarque}</Link>
                    </div>
                    <h1 className="uppercase categorie-hero-h1 text-red-3 ">{marque?.libelleMarque}</h1>
                </div>
            </section>
        </>
    )
}

export default MarqueDetailHero
