"use client"
import Image from "next/image"
import VarianteCard from "../cards/varianteCard"
import { Minus, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { usePanier } from "@/hooks/usePanier"
import { useGetLesFavoris, useGetUnArticles } from "@/hooks/article-fetch/articleFetch"
import { VarianteResponseObject } from "@/types/requestVarianteObject"
import { useFavoris } from "@/hooks/useFavoris"
import { appliquerReduction } from "@/utils/appliquerReduction"
import { toast, ToastContainer } from "react-toastify"

interface Props {
    id: string,
}

const ArticleHeader = ({id}: Props) => {
    const [quantite, setQuantite] = useState<number>(1)
    const [imageIndex, setImageIndex] = useState<number>(0)
    const [isFavoris, setIsFavoris] = useState<boolean>(false)
    const [varianteSelected, setVarianteSelected] = useState<VarianteResponseObject | null>(null)
    const { ajouterLigne, supprimerLigne, modifierQuantiteLigne, articleExiste } = usePanier()    
    const articleDansPanier = articleExiste(Number(id))
    const {article: articleFetch, options} = useGetUnArticles(Number(id))
    const { favorisArticles, refetch } = useGetLesFavoris();
    const { ajouterSupprimerFavoris } = useFavoris({ id, setIsFavoris, isFavoris, refechFavoris: refetch })

    useEffect(() => {

        if(favorisArticles) {
            setIsFavoris(favorisArticles.map(favoris => favoris.articleId).includes(Number(id)))
        }

    }, [favorisArticles, id])

    const changerVariante = (varianteId: number) => {
        const variante = articleFetch?.variantes.find(v => v.idVariante === varianteId)
        if(variante) {
            setVarianteSelected(variante)
        }
    }

    useEffect(() => {
        if(articleDansPanier) {
            setQuantite(articleDansPanier.quantiteLigne)
        }
    }, [articleDansPanier])

    useEffect(() => {

        if(articleFetch) {
            const varianteDefault = articleFetch.variantes.find(v => v.estVarianteParDefaut === true)
            if(varianteDefault) {
                setVarianteSelected(varianteDefault)
            }
        }

    }, [articleFetch])

    const ajouterAuPanier = () => {        

        if (articleFetch) {
            const prixReel = appliquerReduction(articleFetch.typeReductionArticle, articleFetch.reductionArticle, varianteSelected?.prixVente, articleFetch.estReductionActive)
            
            ajouterLigne({
                quantiteLigne: quantite,
                prixUnitaire: prixReel,
                prixTotal: prixReel * quantite,
                articleId: varianteSelected?.idVariante as number,
                image: articleFetch?.imagesArticle[0].urlImage as string,
                nomArticle: articleFetch?.nomArticle
            })
            
            toast.success(
                "Article ajouté au panier",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                }
            )
        }        
    }

    const diminuerQuantite = () => {
        if(quantite > 1) {
            setQuantite(quantite - 1)
            modifierQuantiteLigne(Number(varianteSelected?.idVariante), quantite - 1)
        } else {
            supprimerLigne(Number(varianteSelected?.idVariante))
        }

        toast.success(
            "Article retiré du panier",
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            }
        )
    }

    return (
        <div className="overflow-x-hidden relative pt-24 pb-10 px-[150px] w-screen flex flex-col items-center justify-start max-2xl:px-[100px] max-xl:px-[60px] max-896:!px-4 max-896:!pt-2 max-896:!pb-4 max-md:gap-6">
            <div className="absolute top-0"><ToastContainer /></div>
            <div className="w-full h-auto grid grid-cols-2 items-start justify-center gap-8 max-xl:gap-4 max-lg:flex max-lg:flex-wrap">
                
                <div className="w-full h-full flex items-center justify-between gap-4 max-xl:hidden">
                    <div className="w-[15%] h-full flex flex-col items-center justify-start gap-4 aspect-tiktok"> 
                        {
                            articleFetch?.imagesArticle.map((image, index) => (
                                <div onClick={() => setImageIndex(index)} key={image.idImage} className={`border cursor-pointer relative w-full aspect-square rounded-2xl transition duration-300 ease-out hover:border-red-6 ${imageIndex === index ? "border-red-8" : "border-transparent"}`}>
                                    <Image src={image.urlImage} fill alt="article" className="object-cover rounded-2xl" />
                                </div>
                            ))
                        }
                    </div>
                    {
                        articleFetch?.imagesArticle ? 
                            <div className="relative w-[85%] h-full aspect-square rounded-2xl transition-all duration-200">
                                <Image src={articleFetch?.imagesArticle[imageIndex].urlImage} fill alt="article" className="object-cover rounded-2xl" />
                            </div>
                        :
                            <div className="relative w-[85%] bg-red-6 h-full aspect-square rounded-2xl flex items-center justify-center">
                                <span className="text-red-1 text-xl font-bold">Aucune image</span>
                            </div>
                    }                                        
                </div>

                <div className="w-full h-full hidden justify-between gap-4 p-0.5 rounded-2xl carousel carousel-center items-start max-xl:flex max-lg:h-[33%]">                                       
                    {
                        articleFetch?.imagesArticle.map((image) => (
                            <div key={image.idImage} className="relative w-full h-full aspect-square rounded-2xl carousel-item max-lg:w-1/2 max-md:w-3/5 max-xs:w-full">
                                <Image src={image.urlImage} fill alt="article" className="object-cover rounded-2xl" />
                            </div>
                        ))
                    }
                </div>

                <div className="w-full h-full flex flex-col items-start justify-start gap-3 max-lg:flex-col-reverse">
                    <div className="w-full flex flex-col items-start justify-center gap-3 max-md:gap-2">
                        <div className="w-full text-gris-12 text-2xl font-bold text-left line-clamp-2 max-lg:line-clamp-none max-md:text-xl">
                            {articleFetch?.nomArticle}
                        </div>
                        <div className="flex items-end justify-center gap-4">
                            <span className={`text-red-8 text-2xl text-left font-bold max-md:text-xl ${articleFetch?.estReductionActive ? "block" : "hidden"}`}>
                                {appliquerReduction(articleFetch?.typeReductionArticle, articleFetch?.reductionArticle, varianteSelected?.prixVente, articleFetch?.estReductionActive)?.toLocaleString()} FCFA
                            </span>
                            <span className={`text-left font-bold ${articleFetch?.estReductionActive ? "line-through text-xl text-gris-8 max-md:text-base" : "text-2xl text-red-8 max-md:text-xl"}`}>
                                {varianteSelected?.prixVente.toLocaleString()} FCFA
                            </span>                            
                        </div>                        
                    </div>                        
                    <div className="w-full flex flex-col items-start justify-center gap-3 max-md:gap-2">
                        <span className="text-xl text-gris-12 font-semibold max-md:text-base">
                            {
                                options?.map((option) => (
                                    option.intituleOption
                                )).join(", ")
                            }
                        </span>
                        <div className="w-full rounded-2xl carousel carousel-center items-start space-x-4">
                            {
                                articleFetch?.variantes.map((variante) => (
                                    <VarianteCard
                                        key={variante.idVariante}
                                        id={variante.idVariante}
                                        intitule={variante.valeursOption.map(vo => vo.valeurOption).join(", ")}
                                        image={variante.imageVariante}
                                        prix={variante.prixVente}
                                        handleClick={changerVariante}
                                        estSelected={varianteSelected?.idVariante === variante.idVariante}
                                    />
                                ))
                            }                                                                                                                                    
                        </div>
                    </div>
                    <button onClick={() => ajouterAuPanier()} className="bg-red-8 w-full rounded-full font-bold text-gris-12 text-2xl py-3 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-lg:text-sm max-lg:hidden">
                        Ajouter au panier
                    </button>
                    <button onClick={() => ajouterSupprimerFavoris(!isFavoris)} className={`bg-red-1 w-full rounded-full font-bold text-gris-12 text-2xl py-3 px-4 cursor-pointer ease-in-out transition duration-300 border hover:text-red-8 hover:bg-red-2 hover:border-red-6
                        max-lg:text-sm max-lg:hidden ${isFavoris ? "border-red-8" : "border-red-4"}`}>                        
                        { isFavoris ? "Supprimer des favoris" : "Ajouter aux favoris" }
                    </button>
                </div>
            </div>

            <div className="fixed left-1/2 z-40 -translate-1/2 bottom-2 w-[91.96%] p-2 rounded-full border-[1.5px] border-red-6 bg-red-1 hidden items-center justify-between gap-4 max-lg:flex">
                <div className="border border-red-4 p-2 w-1/3 rounded-full flex items-center justify-between">
                    <button onClick={() => diminuerQuantite()} className="cursor-pointer">
                        <Minus strokeWidth={1.25} className="stroke-red-6 size-6 transition duration-300 ease-in-out hover:stroke-[2] hover:stroke-red-8" />
                    </button>
                    <span className="text-red-8 text-lg font-bold">{quantite}</span>
                    <button onClick={() => setQuantite(quantite + 1)} className="cursor-pointer">
                        <Plus strokeWidth={1.25} className="stroke-red-6 size-6 transition duration-300 ease-in-out hover:stroke-[2] hover:stroke-red-8" />
                    </button>
                </div>
                <button onClick={() => ajouterAuPanier()} className="bg-red-8 w-2/3 rounded-full font-bold text-gris-12 text-2xl py-3 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                    max-lg:text-sm">
                    Ajouter au panier
                </button>
            </div>
        </div>
    )
}

export default ArticleHeader
