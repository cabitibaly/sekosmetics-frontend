"use client"
import { usePanier } from "@/hooks/usePanier"
import PanierCard from "../cards/panierCard"

const PanierBody = () => {
    const { panier } = usePanier()

    return (
        <section className='overflow-x-hidden px-[150px] pt-32 py-6 w-screen h-screen flex flex-col items-center justify-start gap-4 max-2xl:px-[100px] max-xl:px-[60px] max-896:py-20  max-896:!px-4'>
            <div className="w-3/4 flex flex-col items-start justify-center gap-4 max-xl:w-4/5 max-lg:w-full">
                <h1 className="text-4xl text-gris-12 font-bold max-896:hidden">Mon Panier</h1>
                <div className="w-full flex flex-col items-start justify-center gap-4">
                    {
                        panier.length > 0 ? 
                            panier.map(item => <PanierCard key={item.articleId} id={item.articleId} />)
                        :
                            <div className="border border-red-4 w-full h-40 flex items-center justify-center gap-4">
                                <div className="line-clamp-2 text-lg text-gris-12 font-bold ">Aucun article</div>
                            </div>
                    }
                </div>
                <div className="self-end border-t border-gris-6 pt-4 w-full flex flex-col items-end justify-start gap-4">
                    <div className="w-1/2 flex items-center justify-between max-sm:w-full">
                        <span className="text-left text-xl text-gris-12 font-semibold max-896:text-base max-xs:text-sm">Nombre d&apos;articles</span>
                        <span className="text-left text-xl text-red-8 font-bold max-896:text-base max-xs:text-sm">3</span>
                    </div>
                    <div className="w-1/2 flex items-center justify-between max-sm:w-full">
                        <span className="text-left text-xl text-gris-12 font-bold max-896:text-base max-xs:text-sm">Sous-total</span>
                        <span className="text-left text-xl text-red-8 font-bold max-896:text-base max-xs:text-sm">10 000 FCFA</span>
                    </div>
                    <button className={`mt-2 rounded-full font-bold bg-red-8 w-1/2 flex items-center justify-center text-gris-12 text-lg py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-lg:text-sm max-896:hidden`}>
                        Commander
                    </button>
                </div>
            </div>
        </section>
    )
}

export default PanierBody
