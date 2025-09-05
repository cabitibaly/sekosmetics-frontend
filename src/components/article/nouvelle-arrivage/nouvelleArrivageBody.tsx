"use client"
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import ArticleCard from '../../cards/articleCard'
import { useDebounce } from '@/hooks/useDebounce'
import { useGetLesFavoris, useGetNouvelleArrivage } from '@/hooks/article-fetch/articleFetch'
import { MoonLoader } from 'react-spinners'

const NouvelleArrivageBody = () => {
    const [recherche, setRecherche] = useState<string>("")
    const debounceValue = useDebounce(recherche, 500);
    const { articles, isLoading } = useGetNouvelleArrivage(debounceValue.trim() || "");
    const { favorisArticles, refetch } = useGetLesFavoris();

    return (
        <div className={`overflow-x-hidden px-[100px] relative pt-32 py-6 w-screen h-screen flex items-start justify-center gap-4 max-xl:px-[30px] max-896:flex-wrap max-896:!pb-36 max-896:!px-4 max-896:pt-20 max-xs:!pb-24`}>            
            <div className='w-full h-auto flex flex-col items-center justify-start gap-8'>
                <div className='w-3/5 flex flex-col items-center justify-start gap-4 max-lg:w-full'>
                    <span className='text-gris-12 text-3xl font-bold max-896:hidden'>Nouvelle Arrivage</span>
                    <div className="w-full flex items-center justify-between gap-4">   
                        <label htmlFor="recherche-article" className="sr-only">Recherche un article</label>
                        <div className="relative w-[94%] flex items-center justify-center max-896:w-[95%]">
                            <Search strokeWidth={1.25} className="stroke-gris-11 size-6 absolute left-4 max-896:size-5 max-sm:left-3" />
                            <input value={recherche} onChange={e => setRecherche(e.target.value)} id="recherche-article" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 pl-12 p-1.5 placeholder:text-gris-6 max-896:text-sm max-lg:pl-11 max-md:pl-9" placeholder="Rechercher un article..." />
                        </div>                        
                    </div>
                </div>
                {
                    isLoading &&
                    <div className='w-full flex items-center justify-center h-64'>
                        <MoonLoader 
                            size={24}
                            color='#FF7993'
                        />
                    </div>
                }
                {    
                    articles.length > 0 && !isLoading &&
                    <div className="w-full grid grid-cols-6 gap-4 max-2xl:grid-cols-5 max-xl:grid-cols-4 max-sm:!grid-cols-3 max-xs:!grid-cols-2">
                        {
                            articles.map((article) => (
                                <ArticleCard 
                                    key={article.idArticle}
                                    id={article.idArticle}
                                    nom={article.nomArticle}
                                    image={article.imagesArticle[0].urlImage}
                                    prix={article.variantes[0].prixVente}
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
                }
                {
                    !isLoading && articles.length === 0 &&
                    <div className='w-full flex items-center justify-center h-64'>
                        <span className='text-gris-12'>Aucun article trouvé</span>
                    </div>    
                }
            </div>                         
        </div>
  )
}

export default NouvelleArrivageBody
