"use client"
import { ChevronLeft, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetLesVariantes } from "@/hooks/article-fetch/articleFetch";
import VarianteCard from "../cards/varianteCard";
import { useKit } from "@/hooks/useKit";

interface Props {
    articleId: number,
    nomArticle: string,    
    setIdArticle: React.Dispatch<React.SetStateAction<number | null>>,
}

const KitListVariante = ({ articleId, setIdArticle, nomArticle, }: Props) => {
    const [recherche, setRecherche] = useState<string>("")
    const debounceValue = useDebounce(recherche, 500);
    const { variantes, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetLesVariantes(8, articleId);
    const { ajouterLigneKit, kit } = useKit();

    const filterVariantes = useMemo(() => (
        debounceValue ? variantes.filter(v => v.valeursOption.find(vo => vo.valeurOption.toLowerCase().includes(debounceValue.toLowerCase()))) : variantes
    ), [variantes, debounceValue]);

    const toggleClick = (id: number) => {
        ajouterLigneKit({
            articleId: id,
            quantiteLigne: 1,
            prixUnitaire: variantes.find(v => v.idVariante === id)?.prixVente || 0,
            prixTotal: variantes.find(v => v.idVariante === id)?.prixVente || 0,
            image: variantes.find(v => v.idVariante === id)?.imageVariante || "",
            nomArticle: nomArticle,
            valeursOption: variantes.find(v => v.idVariante === id)?.valeursOption.map(vo => ({valeurOption: vo.valeurOption}))
        })
    }

    return (
        <>
            <div className="mb-4 relative w-full flex items-center justify-center">
                <button onClick={() => setIdArticle(null)} className="absolute left-0 cursor-pointer flex items-center justify-center gap-1 transition-all duration-300 ease-out hover:-translate-x-2 max-896:hidden">
                    <ChevronLeft strokeWidth={1.5} className="size-6 stroke-gris-12" />
                    <span className="text-xl text-gris-12 font-semibold">Retour</span>
                </button>
                <button onClick={() => setIdArticle(null)} className="cursor-pointer absolute left-2 size-10 rounded-full bg-gris-3 hidden items-center justify-center transition-all duration-300 ease-out hover:-translate-x-2 max-896:flex max-md:left-0">
                    <ChevronLeft strokeWidth={1.5} className="size-6 stroke-gris-12" />
                </button>
                <span className="w-1/2 text-red-6 text-2xl line-clamp-2 max-xs:text-xl">{nomArticle}</span>
            </div>
            <div className="w-4/5 flex items-center gap-0 max-xl:w-full">   
                <label htmlFor="recherche-article" className="sr-only">Recherche</label>
                <div className="relative w-full flex items-center justify-center">
                    <Search strokeWidth={1.25} className="stroke-gris-11 size-6 absolute left-4 max-896:size-5 max-896:left-2" />
                    <input value={recherche} onChange={e => setRecherche(e.target.value)} id="recherche-article" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 pl-12 p-1.5 placeholder:text-gris-6 max-896:text-sm max-896:pl-8" placeholder="Rechercher une variante..." />
                </div>
            </div>
            <div className="overflow-y-auto pt-4 pr-4 w-full max-h-[86%] flex flex-col items-center justify-start gap-4">
                <div className="w-full grid grid-cols-7 items-start justify-start gap-4 max-xl:grid-cols-4 max-lg:grid-cols-3 max-896:!grid-cols-4 max-[512px]:!grid-cols-3 max-[360px]:grid-cols-2">
                    {
                        filterVariantes.map(variante => (
                            <VarianteCard
                                key={variante.idVariante}
                                id={variante.idVariante}
                                intitule={variante.valeursOption[0].valeurOption}
                                image={variante.imageVariante}
                                prix={variante.prixVente}
                                handleClick={() => toggleClick(variante.idVariante)}
                                estSelected={kit.map(k => k.articleId).includes(variante.idVariante)}
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
        </>
    )
}

export default KitListVariante
