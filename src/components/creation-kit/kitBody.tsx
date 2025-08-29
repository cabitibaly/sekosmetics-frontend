"use client"
import { Search } from "lucide-react"
import KitCategorieCard from "../cards/kitCategorieCard"
import { useState } from "react"
import KitCard from "../cards/kitCard"
import KitListArticle from "./kitListArticle"
import { useKit } from "@/hooks/useKit"
import { useGetLesCategories } from "@/hooks/categorie-fetch/categorieFetch"
import { MoonLoader } from "react-spinners"
import { useDebounce } from "@/hooks/useDebounce"

const KitBody = () => {
    const [categorie, setCategorie] = useState<number>(0)    
    const [recherche, setRecherche] = useState<string>("")
    const debouceValue = useDebounce(recherche, 500);
    const { kit } = useKit()    
    const { categories, isLoading } = useGetLesCategories(debouceValue.trim() || "");
    const nbArticle = kit.reduce((acc, curr) => acc + curr.quantiteLigne, 0)
    const sousTotal = kit.reduce((acc, curr) => acc + curr.prixTotal, 0)

    return (
        <section className='overflow-x-hidden relative px-[100px] pt-32 py-6 w-screen h-screen flex items-center justify-center gap-4 max-xl:px-[60px] max-896:flex-wrap max-896:pt-20 max-896:pb-0 max-896:!px-4'>
            <div className="w-1/4 h-full flex flex-col items-center justify-start gap-4 max-xl:w-1/3 max-896:!w-full max-896:h-auto">
                <div className="pt-4 pr-4 w-full carousel space-x-4 rounded-3xl">
                    {
                        kit.length > 0 ?
                            kit.map(item => <KitCard key={item.articleId} id={item.articleId} />)
                        :
                            <div className="w-full h-40 flex items-center justify-center gap-4">
                                <div className="line-clamp-2 text-lg text-gris-12 font-bold ">Aucun article</div>
                            </div>
                    }
                </div>
                <hr className="w-full border border-red-3" />
                <div className="w-full flex flex-col items-center justify-center gap-4">
                    <div className="w-full flex items-center justify-between max-sm:w-full">
                        <span className="text-left text-base text-gris-12 font-semibold max-896:text-base max-xs:text-sm">Nombre d&apos;articles</span>
                        <span className="text-left text-base text-red-8 font-bold max-896:text-base max-xs:text-sm">{nbArticle}</span>
                    </div>
                    <div className="w-full flex items-center justify-between max-sm:w-full">
                        <span className="text-left text-base text-gris-12 font-bold max-896:text-base max-xs:text-sm">Sous-total</span>
                        <span className="text-left text-base text-red-8 font-bold max-896:text-base max-xs:text-sm">{sousTotal.toLocaleString("fr-FR")} FCFA</span>
                    </div>
                </div>
            </div>
            <div className="border border-red-3 rounded-3xl bg-red-1 p-4 w-3/4 h-full flex flex-col items-center justify-start gap-4 max-xl:w-2/3 max-896:rounded-b-none max-896:!w-full max-896:h-3/4">
                {
                    isLoading &&
                    <div className="w-full h-[93%] overflow-auto flex items-center justify-center gap-4 max-xl:grid-cols-4 max-lg:grid-cols-3 max-896:!grid-cols-4 max-md:!grid-cols-3 max-xs:!grid-cols-2">
                        <MoonLoader 
                            color="#FF7993"
                            size={24}
                        />
                    </div>
                }
                
                {   
                    categorie === 0 && !isLoading &&
                    <>
                        <div className="w-4/5 flex items-center gap-0 max-sm:w-full">   
                            <label htmlFor="recherche-cqtegorie" className="sr-only">Recherche</label>
                            <div className="relative w-full flex items-center justify-center">
                                <Search strokeWidth={1.25} className="stroke-gris-11 size-6 absolute left-10 max-[1545px]:left-7 max-md:left-5 max-md:size-5" />
                                <input value={recherche} onChange={e => setRecherche(e.target.value)} id="recherche-cqtegorie" type="text" className="bg-gris-1 border border-red-4  block w-[95%] text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 pl-12 p-1.5 placeholder:text-gris-6 max-896:text-sm max-[1545px]:pl-12 max-md:pl-9" placeholder="Rechercher une categorie..." />
                            </div>
                        </div>
                        <div className="w-full max-h-[93%] overflow-auto grid grid-cols-5 items-start justify-start gap-4 max-xl:grid-cols-4 max-lg:grid-cols-3 max-896:!grid-cols-4 max-md:!grid-cols-3 max-xs:!grid-cols-2">
                            {
                                categories.map(item => (
                                    <KitCategorieCard
                                        key={item.idCategorie}
                                        id={item.idCategorie}
                                        intitule={item.libelleCategorie}
                                        image={item.imgCategorie}
                                        setCategory={() => setCategorie(item.idCategorie)}                                                                            
                                    />
                                ))
                            }
                        </div>
                    </>
                }
                {
                    categorie !== 0 &&
                    <KitListArticle 
                        categorie={categorie}                                                 
                        setCategorie={setCategorie}
                    />
                }
            </div>
        </section>
    )
}

export default KitBody
