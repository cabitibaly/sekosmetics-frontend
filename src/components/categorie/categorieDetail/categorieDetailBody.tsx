"use client"
import ArticleCard from "@/components/cards/articleCard"
import FilterModal from "@/components/modal/filterModal"
import { useGetLesArticlesPagine, useGetLesFavoris } from "@/hooks/article-fetch/articleFetch"
import { useDebounce } from "@/hooks/useDebounce"
import { Search } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

const CategorieDetailBody = ({id}: {id: string}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);    
    const [marqueId, setMarqueId] = useState<string | undefined>(undefined);
    const [prixMin, setPrixMin] = useState<string>("");
    const [prixMax, setPrixMax] = useState<string>("");
    const [recherche, setRecherche] = useState<string>("")
    const debouceValue = useDebounce(recherche, 500);
    const { articles, refetch: refetchArticles, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetLesArticlesPagine(8, id, marqueId || "", debouceValue.trim() || "", prixMin || "", prixMax || "");
    const { favorisArticles, refetch } = useGetLesFavoris();   

    useEffect(() => {
        if(isFilterOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isFilterOpen])

    useEffect(() => {
        if (!isFilterOpen) { 
            refetchArticles()
        }
    }, [isFilterOpen, refetchArticles])

    return (
        <div className="overflow-x-hidden px-[150px] py-12 w-screen min-h-screen flex flex-col items-center justify-start gap-12 max-2xl:px-[100px] max-xl:px-[60px] max-lg:py-8 max-896:!px-4 max-896:!pt-20 max-896:!pb-36 max-md:gap-6">            
            <div className="w-3/5 flex items-center gap-0 max-896:w-4/5 max-sm:w-full">   
                <label htmlFor="recherche-article" className="sr-only">Recherche</label>
                <div className="relative w-full flex items-center justify-center">
                    <Search strokeWidth={1.25} className="stroke-gris-11 size-6 absolute left-10 max-[1545px]:left-7 max-md:left-5 max-md:size-5" />
                    <input value={recherche} onChange={e => setRecherche(e.target.value)} id="recherche-article" type="text" className="bg-gris-1 border border-red-4  block w-[95%] text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 pl-12 p-1.5 placeholder:text-gris-6 max-896:text-sm max-[1545px]:pl-10 max-lg:pl-11 max-md:pl-9" placeholder="Rechercher un article..." />
                </div>
                <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="relative size-10 rounded-full bg-gris-3 flex items-center justify-center cursor-pointer transition duration-200 ease-in-out hover:bg-gris-4">
                    <Image src={"/filter.svg"} width={24} height={10} alt={"filtre"} />
                </button>
            </div>   
            <div className="w-full flex flex-col items-center justify-start gap-4">
                    <div className='w-full grid grid-cols-6 gap-4 max-2xl:grid-cols-5 max-xl:grid-cols-4 max-sm:!grid-cols-3 max-xs:!grid-cols-2'>
                        {
                            articles.map((article) => (
                                <ArticleCard 
                                    key={article.idArticle}
                                    id={article.idArticle}
                                    nom={article.nomArticle}
                                    image={article.imagesArticle[0].urlImage}
                                    prix={article?.variantes[0]?.prixVente}
                                    notaion={article.notationArticle}
                                    estFavori={favorisArticles.map(favoris => favoris.articleId).includes(article.idArticle)}
                                    refechFavoris={() => refetch()}
                                    idFavoris={favorisArticles.find(favoris => favoris.articleId === article.idArticle)?.idFavori}
                                    reduction={{
                                        type: article.typeReductionArticle,
                                        valeur: article.reductionArticle,
                                        estActive: article.estReductionActive
                                    }}
                                />
                            ))
                        }
                    </div>

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
            {
                isFilterOpen &&
                    <FilterModal 
                        isModalOpen={isFilterOpen} 
                        setIsModalOpen={setIsFilterOpen} 
                        categorieId={id} 
                        setCategorieId={() => {}}                       
                        marqueId={marqueId} 
                        setMarqueId={setMarqueId} 
                        prixMin={prixMin} 
                        setPrixMin={setPrixMin} 
                        prixMax={prixMax} 
                        setPrixMax={setPrixMax}
                        refetchArticles={refetchArticles}
                    />
            }         
        </div>
    )
}

export default CategorieDetailBody
