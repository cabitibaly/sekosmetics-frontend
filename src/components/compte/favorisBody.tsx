import { Search } from "lucide-react"
import CompteNavbar from "../navbar/compteNavbar"
import FilterIcon from "../../../public/svg/filterIcon"
import ArticleCard from "../cards/articleCard"
import { articles } from "@/data/articles"

const FavorisBody = () => {
    return (
        <div className={`overflow-x-hidden px-[100px] pt-32 py-6 w-screen h-screen flex items-start justify-center gap-4 max-xl:px-[30px] max-896:flex-wrap max-896:!pb-4 max-896:!px-4 max-896:pt-20`}>
            <div className='w-4/5 h-full flex items-start justify-center gap-8 max-lg:w-[90%] max-896:!w-full'>
                <CompteNavbar />
                <div className='border border-red-3 p-4 rounded-3xl bg-red-1 w-3/5 max-h-full flex flex-col items-center justify-start gap-4 max-896:w-full max-896:bg-transparent max-896:border-none max-896:p-0'>
                    <div className="w-full flex items-center justify-between gap-4">   
                        <label htmlFor="recherche-article" className="sr-only">Recherche Article</label>
                        <div className="relative w-[90%] flex items-center justify-center max-896:w-[95%]">
                            <Search strokeWidth={1.25} className="stroke-gris-11 size-6 absolute left-4 max-896:size-5 max-sm:left-3" />
                            <input id="recherche-article" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 pl-12 p-1.5 placeholder:text-gris-6 max-896:text-sm max-lg:pl-11 max-md:pl-9" placeholder="Rechercher un article..." />
                        </div>
                        <button className="relative size-10 rounded-full bg-gris-3 flex items-center justify-center cursor-pointer transition duration-200 ease-in-out hover:bg-gris-4 ">
                            <FilterIcon className="stroke-gris-12 size-5" />
                        </button>
                    </div>
                    <div className="overflow-auto w-full grid grid-cols-3 items-center justify-start gap-4 max-[1380px]:grid-cols-2 max-896:!grid-cols-4 max-sm:!grid-cols-3 max-xs:!grid-cols-2">
                        {
                            articles.map((article) => (
                                <ArticleCard 
                                    key={article.id}
                                    id={article.id}
                                    nom={article.nom}
                                    image={article.image}
                                    prix={article.prix}
                                    notaion={article.notaion}
                                    estFavori={article.estFavori}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavorisBody
