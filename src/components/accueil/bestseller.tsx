"use client"
import Link from "next/link"
import ArticleCard from "../cards/articleCard"
import { useGetBestseller, useGetLesFavoris } from "@/hooks/article-fetch/articleFetch"
import { MoonLoader } from "react-spinners"

const Bestseller = () => {
    const { articles, isLoading } = useGetBestseller();
    const { favorisArticles, refetch } = useGetLesFavoris();

    return (
        <section className="overflow-x-hidden px-[150px] py-6 w-screen flex flex-col items-center justify-start gap-4 max-2xl:px-[100px] max-xl:px-[60px] max-xl:py-2 max-896:!px-4 max-896:!pb-36 max-xs:!pb-24">
            <div className="w-full flex items-center justify-between">
                <span className="span-font-size text-gris-12 font-bold max-sm:!text-2xl max-xs:!text-lg">Bestseller</span>
                <Link href={"/article/bestseller"} className="link-voir-plus text-red-8 font-bold max-sm:!text-lg max-xs:!text-sm">Voir plus</Link>
            </div>

            {
                isLoading &&
                    <div className='w-full h-64 flex items-center justify-center'>
                        <MoonLoader                                    
                            color="#FF7993"
                            size={24}
                        />
                    </div>
            }
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
            {
                articles.length === 0 && !isLoading && (
                    <div className='w-full h-64 flex items-center justify-center'>
                        <p className='text-gris-12'>Aucun article</p>
                    </div>
                )
            }
        </section>
    )
}

export default Bestseller
