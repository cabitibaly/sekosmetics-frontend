"use client"
import { useEffect, useState } from "react"
import CommentaireCard from "../cards/commentaireCard"
import { useGetLesCommentaireDeUnArticle, useGetUnArticles } from "@/hooks/article-fetch/articleFetch"
import EditeurTexte from "../editeur-texte/editeurTexte"
import AjouterCommentaire from "../cards/ajouterCommentaire"
import { ToastContainer } from "react-toastify"

const ArticleBody = ({id}: {id: string}) => {
    const [tab, setTab] = useState<string>("1") 
    const [html, setHtml] = useState<string>("");
    const { article, isLoading } = useGetUnArticles(Number(id)) 
    const { commentaires, notations, refetch } = useGetLesCommentaireDeUnArticle(Number(id));
    
    useEffect(() => {
        if(article) {
            setHtml(article?.descriptionArticle || "");
        }
    }, [article])

    return (
        <div className={`overflow-x-hidden px-[150px] py-6 w-screen flex-col items-center justify-start gap-4 max-2xl:px-[100px] max-xl:px-[60px] max-xl:py-2 max-896:!px-4 max-896:!pb-38 ${isLoading ? "hidden" : "flex"}`}>            
            <ToastContainer />
            <div className="border-b border-gris-6 pb-6 w-full carousel carousel-start items-center justify-center gap-4 max-lg:justify-start max-lg:pb-3">
                <button onClick={() => setTab("1")} className={`carousel-item rounded-full font-bold text-lg py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                    max-lg:text-sm max-md:text-xs ${tab === "1" ? "bg-red-8 text-gris-12" : "bg-transparent border-transparent text-gris-8"}`}>
                    Description
                </button>
                <button onClick={() => setTab("2")} className={`carousel-item rounded-full font-bold text-lg py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                    max-lg:text-sm max-md:text-xs ${tab === "2" ? "bg-red-8 text-gris-12" : "bg-transparent border-transparent text-gris-8"}`}>
                    specification
                </button>
                <button onClick={() => setTab("3")} className={`carousel-item rounded-full font-bold text-lg py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                    max-lg:text-sm max-md:text-xs ${tab === "3" ? "bg-red-8 text-gris-12" : "bg-transparent border-transparent text-gris-8"}`}>
                    Commenatire
                </button>
            </div>
            {   
                tab === "1" &&
                <div className="w-4/5 max-lg:w-full">
                    <EditeurTexte 
                        onChange={setHtml} 
                        html={html}
                        isEditable={false} 
                    />
                </div>                
            }

            {  
                tab === "2" &&
                <div className="w-4/5 flex flex-col items-start justify-center gap-4 max-lg:w-full">
                    <div className="border-b border-gris-4 pb-2 w-full flex items-center justify-between">
                        <span className="text-left text-xl text-gris-8 font-semibold max-896:text-base max-xs:text-sm">Longueur</span>
                        <span className="text-left text-xl text-gris-12 font-bold max-896:text-base max-xs:text-sm">{article?.longueur ?? "0 cm"}</span>
                    </div>
                    <div className="border-b border-gris-4 pb-2 w-full flex items-center justify-between">
                        <span className="text-left text-xl text-gris-8 font-semibold max-896:text-base max-xs:text-sm">Largeur</span>
                        <span className="text-left text-xl text-gris-12 font-bold max-896:text-base max-xs:text-sm">{article?.largeur ?? "0 cm"}</span>
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <span className="text-left text-xl text-gris-8 font-semibold max-896:text-base max-xs:text-sm">Poids</span>
                        <span className="text-left text-xl text-gris-12 font-bold max-896:text-base max-xs:text-sm">{article?.poids ?? "0 g"}</span>
                    </div>
                </div>
            }

            {
                tab === "3" &&
                <div className="w-4/5 flex flex-col items-start justify-center gap-8 max-lg:w-full">                    
                    <div className="w-full flex items-center justify-between gap-4 max-896:flex-col">
                        <div className="border-r border-gris-8 w-1/4 h-full flex flex-col items-center justify-center gap-2 max-896:border-r-0 max-896:w-3/4 max-896:border-b max-896:pb-4 max-md:flex-row max-md:justify-between max-sm:w-full">
                            <span className="text-3xl text-gris-12 font-bold text-center max-lg:text-xl max-md:base">{article?.notationArticle}</span>
                            <div className="rating">
                                <div className="mask mask-star bg-jaune max-lg:size-4 max-md:size-5" aria-label="1 star" aria-current={article?.notationArticle === 1}></div>
                                <div className="mask mask-star bg-jaune max-lg:size-4 max-md:size-5" aria-label="2 star" aria-current={article?.notationArticle === 2}></div>
                                <div className="mask mask-star bg-jaune max-lg:size-4 max-md:size-5" aria-label="3 star" aria-current={article?.notationArticle === 3}></div>
                                <div className="mask mask-star bg-jaune max-lg:size-4 max-md:size-5" aria-label="4 star" aria-current={article?.notationArticle === 4}></div>
                                <div className="mask mask-star bg-jaune max-lg:size-4 max-md:size-5" aria-label="5 star" aria-current={article?.notationArticle === 5}></div>
                            </div>
                            <span className="text-xl text-gris-8 font-bold text-center max-lg:text-base max-md:text-sm">{commentaires.length} avis</span>
                        </div>
                        <div className="w-3/4 flex flex-col items-center justify-center gap-2 max-sm:w-full">
                            <div className="w-full flex items-center justify-between gap-4">
                                <span className="text-xl text-gris-8 font-bold text-center max-lg:text-base max-md:text-sm">{notations?.star5}</span>
                                <div className="w-[90%] h-6 bg-gris-4 rounded-3xl max-lg:h-4">
                                    <div style={{ width: `${((notations?.star5 || 0) / commentaires.length) * 100}%` }} className={`h-full bg-jaune rounded-3xl`}></div>
                                </div> 
                                <span className="text-xl text-gris-12 font-bold text-center max-lg:text-base max-md:text-sm">5</span>                               
                            </div>
                            <div className="w-full flex items-center justify-between gap-4">
                                <span className="text-xl text-gris-8 font-bold text-center max-lg:text-base max-md:text-sm">{notations?.star4}</span>
                                <div className="w-[90%] h-6 bg-gris-4 rounded-3xl max-lg:h-4">
                                    <div style={{ width: `${((notations?.star4 || 0) / commentaires.length) * 100}%` }} className={`h-full bg-jaune rounded-3xl`}></div>
                                </div> 
                                <span className="text-xl text-gris-12 font-bold text-center max-lg:text-base max-md:text-sm">4</span>                               
                            </div>
                            <div className="w-full flex items-center justify-between gap-4">
                                <span className="text-xl text-gris-8 font-bold text-center max-lg:text-base max-md:text-sm">{notations?.star3}</span>
                                <div className="w-[90%] h-6 bg-gris-4 rounded-3xl max-lg:h-4">
                                    <div style={{ width: `${((notations?.star3 || 0) / commentaires.length) * 100}%` }} className="h-full bg-jaune rounded-3xl"></div>
                                </div> 
                                <span className="text-xl text-gris-12 font-bold text-center max-lg:text-base max-md:text-sm">3</span>                               
                            </div>
                            <div className="w-full flex items-center justify-between gap-4">
                                <span className="text-xl text-gris-8 font-bold text-center max-lg:text-base max-md:text-sm">{notations?.star2}</span>
                                <div className="w-[90%] h-6 bg-gris-4 rounded-3xl max-lg:h-4">
                                    <div style={{ width: `${((notations?.star2 || 0) / commentaires.length) * 100}%` }} className="h-full bg-jaune rounded-3xl"></div>
                                </div> 
                                <span className="text-xl text-gris-12 font-bold text-center max-lg:text-base max-md:text-sm">2</span>                               
                            </div>
                            <div className="w-full flex items-center justify-between gap-4">
                                <span className="text-xl text-gris-8 font-bold text-center max-lg:text-base max-md:text-sm">{notations?.star1}</span>
                                <div className="w-[90%] h-6 bg-gris-4 rounded-3xl max-lg:h-4">
                                    <div style={{ width: `${((notations?.star1 || 0) / commentaires.length) * 100}%` }} className="h-full bg-jaune rounded-3xl"></div>
                                </div> 
                                <span className="text-xl text-gris-12 font-bold text-center max-lg:text-base max-md:text-sm">1</span>                               
                            </div>
                        </div>
                    </div>

                    <AjouterCommentaire 
                        idArticle={id} 
                        refetch={refetch}
                    />                    

                    {        
                        commentaires.length > 0 &&                            
                            (
                                commentaires.map((commentaire, index) => {
                                    return (
                                        <div key={commentaire.idAvis} className="w-full flex flex-col items-start justify-center gap-4">
                                            <CommentaireCard key={commentaire.idAvis} commentaire={commentaire} />
                                            <hr className={`w-full border-[.75px] border-gris-4 ${index === commentaires.length - 1 ? "hidden" : ""}`} />
                                        </div>
                                    )
                                })
                            )                            
                    }
                </div>
            }
        </div>
    )
}

export default ArticleBody
