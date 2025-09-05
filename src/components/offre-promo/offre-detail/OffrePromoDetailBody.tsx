"use client"

import ArticleCard from '@/components/cards/articleCard'
import { useGetLesArticles, useGetLesFavoris } from '@/hooks/article-fetch/articleFetch'
import { useDebounce } from '@/hooks/useDebounce'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const OffrePromoDetailBody = () => {
    const [recherche, setRecherche] = useState<string>("")
    const debounceValue = useDebounce(recherche, 500);
    const { articles } = useGetLesArticles("", "", debounceValue.trim() || "", "", "");
    const { favorisArticles, refetch } = useGetLesFavoris();    

    return (
        <div className="overflow-x-hidden px-[150px] py-12 w-screen min-h-screen flex flex-col items-center justify-start gap-8 max-2xl:px-[100px] max-xl:px-[60px] max-896:!px-4 max-896:!pt-20 max-896:!pb-36 max-md:gap-6 max-xs:!pb-28">
            <div className="px-4 relative top-0 w-screen items-center justify-centerx">
                <div className="rounded-3xl relative w-full aspect-video flex items-center justify-between">
                    <Image src={"/hero-bg.jpg"} fill alt="hero-bg" className="object-cover rounded-3xl"/>
                </div>
            </div> 
            <div className='w-full h-auto flex flex-col items-center justify-start gap-8'>
                <div className='w-3/5 flex flex-col items-center justify-start gap-4 max-lg:w-full'>                    
                    <div className="w-full flex items-center justify-between gap-4">   
                        <label htmlFor="recherche-article" className="sr-only">Recherche un article</label>
                        <div className="relative w-[94%] flex items-center justify-center max-896:w-[95%]">
                            <Search strokeWidth={1.25} className="stroke-gris-11 size-6 absolute left-4 max-896:size-5 max-sm:left-3" />
                            <input value={recherche} onChange={e => setRecherche(e.target.value)} id="recherche-article" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 pl-12 p-1.5 placeholder:text-gris-6 max-896:text-sm max-lg:pl-11 max-md:pl-9" placeholder="Rechercher un article..." />
                        </div>
                    </div>
                </div>
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
            </div>
        </div>
    )
}

export default OffrePromoDetailBody
