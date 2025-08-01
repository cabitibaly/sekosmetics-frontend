"use client"
import Image from "next/image"
import VarianteCard from "../cards/varianteCard"
import { Minus, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { usePanier } from "@/hooks/usePanier"
import { articles } from "@/data/articles"

interface Props {
    id: string,
}

const ArticleHeader = ({id}: Props) => {
    const [quantite, setQuantite] = useState<number>(1)
    const { ajouterLigne, supprimerLigne, modifierQuantiteLigne, articleExiste } = usePanier()
    const article = articles.find(a => a.id === Number(id))
    const articleDansPanier = articleExiste(Number(id))

    useEffect(() => {
        if(articleDansPanier) {
            setQuantite(articleDansPanier.quantiteLigne)
        }
    }, [articleDansPanier])

    const ajouterAuPanier = () => {        

        if (article) {
            ajouterLigne({
                quantiteLigne: quantite,
                prixUnitaire: article.prix,
                prixTotal: article.prix * quantite,
                articleId: article.id,
                image: article.image
            })            
        }
    }

    const diminuerQuantite = () => {
        if(quantite > 1) {
            setQuantite(quantite - 1)
            modifierQuantiteLigne(Number(id), quantite - 1)
        } else {
            supprimerLigne(Number(id))
        }
    }

    return (
        <div className="overflow-x-hidden relative pt-24 pb-10 px-[150px] w-screen flex flex-col items-center justify-start max-2xl:px-[100px] max-xl:px-[60px] max-896:!px-4 max-896:!pt-2 max-896:!pb-4 max-md:gap-6">
            <div className="w-full h-auto grid grid-cols-2 items-start justify-center gap-8 max-xl:gap-4 max-lg:flex max-lg:flex-wrap">
                
                <div className="w-full h-full flex items-center justify-between gap-4 max-xl:hidden">
                    <div className="w-[15%] h-full flex flex-col items-center justify-start gap-4 aspect-tiktok">
                        <div className="relative w-full aspect-square rounded-2xl">
                            <Image src={article?.image as string} fill alt="article" className="object-cover rounded-2xl" />
                        </div>
                        <div className="relative w-full aspect-square rounded-2xl">
                            <Image src={"/image-19.jpg"} fill alt="article" className="object-cover rounded-2xl" />
                        </div>
                        <div className="relative w-full aspect-square rounded-2xl">
                            <Image src={"/image-16.jpg"} fill alt="article" className="object-cover rounded-2xl" />
                        </div>
                        <div className="relative w-full aspect-square rounded-2xl">
                            <Image src={"/image-20.jpg"} fill alt="article" className="object-cover rounded-2xl" />
                        </div>
                    </div>                    
                    <div className="relative w-[85%] h-full aspect-square rounded-2xl">
                        <Image src={"/image-17.jpg"} fill alt="article" className="object-cover rounded-2xl" />
                    </div>
                </div>

                <div className="w-full h-full hidden justify-between gap-4 p-0.5 rounded-2xl carousel carousel-center items-start max-xl:flex max-lg:h-[33%]">                   
                    <div className="relative w-full h-full aspect-square rounded-2xl carousel-item max-lg:w-1/2 max-md:w-3/5 max-xs:w-full">
                        <Image src={article?.image as string} fill alt="article" className="object-cover rounded-2xl" />
                    </div>
                    <div className="relative w-full h-full aspect-square rounded-2xl carousel-item max-lg:w-1/2 max-md:w-3/5 max-xs:w-full">
                        <Image src={"/image-19.jpg"} fill alt="article" className="object-cover rounded-2xl" />
                    </div>
                    <div className="relative w-full h-full aspect-square rounded-2xl carousel-item max-lg:w-1/2 max-md:w-3/5 max-xs:w-full">
                        <Image src={"/image-16.jpg"} fill alt="article" className="object-cover rounded-2xl" />
                    </div>
                    <div className="relative w-full h-full aspect-square rounded-2xl carousel-item max-lg:w-1/2 max-md:w-3/5 max-xs:w-full">
                        <Image src={"/image-20.jpg"} fill alt="article" className="object-cover rounded-2xl" />
                    </div>
                </div>

                <div className="w-full h-full flex flex-col items-start justify-start gap-3 max-lg:flex-col-reverse">
                    <div className="w-full flex flex-col items-start justify-center gap-3 max-md:gap-2">
                        <div className="w-full text-gris-12 text-2xl font-bold text-left line-clamp-2 max-lg:line-clamp-none max-md:text-xl">
                            {article?.nom}
                        </div>
                        <span className="text-red-8 text-2xl text-left font-bold max-md:text-xl">{article?.prix.toLocaleString()} FCFA</span>
                    </div>                        
                    <div className="w-full flex flex-col items-start justify-center gap-3 max-md:gap-2">
                        <span className="text-xl text-gris-12 font-semibold max-md:text-base">Couleur</span>
                        <div className="w-full rounded-2xl carousel carousel-center items-start space-x-4">
                            <VarianteCard
                                id={1}
                                intitule={"Glimmering Guava"}
                                image={"/image-21.jpg"}
                                prix={10000}
                            />                          
                            <VarianteCard
                                id={2}
                                intitule={"Dazzaling Peaony"}
                                image={"/image-23.jpg"}
                                prix={12000}
                            />                          
                            <VarianteCard
                                id={3}
                                intitule={"Glowing mango"}
                                image={"/image-22.jpg"}
                                prix={8000}
                            />                                                                                                                                      
                        </div>
                    </div>
                    <button onClick={() => ajouterAuPanier()} className="bg-red-8 w-full rounded-full font-bold text-gris-12 text-2xl py-3 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-lg:text-sm max-lg:hidden">
                        Ajouter au panier
                    </button>
                    <button className="bg-red-1 w-full rounded-full font-bold text-gris-12 text-2xl py-3 px-4 cursor-pointer ease-in-out transition duration-300 border border-red-4 hover:text-red-8 hover:bg-red-2 hover:border-red-6
                        max-lg:text-sm max-lg:hidden">
                        Ajouter au favoris
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
