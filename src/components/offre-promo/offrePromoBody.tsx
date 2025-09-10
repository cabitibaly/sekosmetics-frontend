"use client"
import { useGetLesOffres } from "@/hooks/offre-fetch/offreFetch"
import Image from "next/image"
import Link from "next/link"
import { MoonLoader } from "react-spinners"

const OffrePromoBody = () => {
    const { offres, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetLesOffres();

    return (
        <div className="overflow-x-hidden px-[150px] py-12 w-screen min-h-screen flex flex-col items-center justify-start gap-8 max-2xl:px-[100px] max-xl:px-[60px] max-896:!px-4 max-896:!pt-20 max-896:!pb-36 max-md:gap-6 max-xs:!pb-28">
            <h3 className="mt-16 self-start text-2xl text-gris-12 font-bold max-896:hidden">Les Offres disponibles</h3>
            {
                isLoading &&
                <div className="w-full h-64 flex items-center justify-center">
                    <MoonLoader
                        color="#FF7993"
                        size={24}
                    />
                </div>
            }

            {
                !isLoading && offres.length > 0 &&                
                    <div className="w-full flex flex-col items-center justify-center gap-8 max-896:gap-4">
                        {     
                            offres.map((offre) => (
                                offre &&
                                <Link key={offre.idOffre} href={`/offre-promotionnelle/${offre.idOffre}`} className="relative w-full aspect-video rounded-2xl group overflow-hidden">
                                    <Image src={offre.imageOffre!} fill alt="otp" className="rounded-2xl object-cover transition duration-300 ease-in-out group-hover:scale-110"/>
                                </Link>
                            ))
                        }
                    </div>                
            }

            {
                !isLoading && offres.length === 0 &&
                <div className="w-full h-64 flex items-center justify-center">
                    <span className="text-gris-12 text-base font-bold">Aucune offre disponible</span>
                </div>
            }

            {    
                hasNextPage &&
                <div className="w-full flex items-center justify-center">
                    <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className={`rounded-full font-bold bg-red-8 flex items-center justify-center text-gris-12 text-lg py-1.5 px-3 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-lg:text-base`}>
                        Charger plus
                    </button>
                </div>
            }

        </div>
    )
}

export default OffrePromoBody
