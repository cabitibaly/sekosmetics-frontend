"use client"
import { ChevronLeft, Search } from "lucide-react";
import KitArticleCard from "../cards/kitArticleCard";
import { useGetLesArticles } from "@/hooks/article-fetch/articleFetch";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetUneCategorie } from "@/hooks/categorie-fetch/categorieFetch";
import KitListVariante from "./kitListVariante";

interface Props {
    categorie: number | null,        
    setCategorie: (categorie: number) => void
}

const KitListArticle = ({ categorie, setCategorie }: Props) => {
    const [recherche, setRecherche] = useState<string>("")
    const [articleSelected, setArticleSelected] = useState<number | null>(null)
    const debounceValue = useDebounce(recherche, 500);
    const { articles } = useGetLesArticles(categorie?.toString(), "", debounceValue.trim() || "");
    const { categorie: categorieFetch } = useGetUneCategorie(categorie);

    return (
        <>
            {
                articleSelected === null &&
                <>
                    <div className="mb-4 relative w-full flex items-center justify-center">
                        <button onClick={() => {setCategorie(0)}} className="absolute left-0 cursor-pointer flex items-center justify-center gap-1 transition-all duration-300 ease-out hover:-translate-x-2 max-896:hidden">
                            <ChevronLeft strokeWidth={1.5} className="size-6 stroke-gris-12" />
                            <span className="text-xl text-gris-12 font-semibold">Retour</span>
                        </button>
                        <button onClick={() => {setCategorie(0)}} className="cursor-pointer absolute left-2 size-10 rounded-full bg-gris-3 hidden items-center justify-center transition-all duration-300 ease-out hover:-translate-x-2 max-896:flex max-md:left-0">
                            <ChevronLeft strokeWidth={1.5} className="size-6 stroke-gris-12" />
                        </button>
                        <span className="text-red-6 text-2xl max-xs:text-xl">{categorieFetch?.libelleCategorie}</span>
                    </div>
                    <div className="w-4/5 flex items-center gap-0 max-xl:w-full">   
                        <label htmlFor="recherche-article" className="sr-only">Recherche</label>
                        <div className="relative w-full flex items-center justify-center">
                            <Search strokeWidth={1.25} className="stroke-gris-11 size-6 absolute left-4 max-896:size-5 max-896:left-2" />
                            <input value={recherche} onChange={e => setRecherche(e.target.value)} id="recherche-article" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 pl-12 p-1.5 placeholder:text-gris-6 max-896:text-sm max-896:pl-8" placeholder="Rechercher un article..." />
                        </div>
                    </div>
                    <div className="overflow-y-auto pt-4 pr-4 w-full max-h-[86%] grid grid-cols-5 items-start justify-start gap-4 max-xl:grid-cols-4 max-lg:grid-cols-3 max-896:!grid-cols-4 max-md:!grid-cols-3 max-xs:!grid-cols-2">
                        {
                            articles.map(item => (
                                <KitArticleCard 
                                    key={item.idArticle} 
                                    id={item.idArticle}
                                    setIdArticle={setArticleSelected}
                                    nom={item.nomArticle} 
                                    image={item.imagesArticle[0].urlImage}
                                    prix={item.variantes[0].prixVente}
                                />
                            ))
                        }                         
                    </div>
                </>
            }

            {
                articleSelected !== null &&
                <KitListVariante
                    articleId={articleSelected}
                    nomArticle={articles.find(a => a.idArticle === articleSelected)?.nomArticle || ""}                    
                    setIdArticle={setArticleSelected}
                />
            }
        </>
    )
}

export default KitListArticle
