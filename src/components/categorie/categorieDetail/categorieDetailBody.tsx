import ArticleCard from "@/components/cards/articleCard"
import { Search } from "lucide-react"
import Image from "next/image"

const CategorieDetailBody = () => {
    return (
        <div className="overflow-x-hidden px-[150px] py-12 w-screen min-h-screen flex flex-col items-center justify-start gap-12 max-2xl:px-[100px] max-xl:px-[60px] max-lg:py-8 max-896:!px-4 max-896:!pt-20 max-896:!pb-36 max-md:gap-6">
            <div className="w-3/5 flex items-center gap-0 max-896:w-4/5 max-sm:w-full">   
                <label htmlFor="recherche-article" className="sr-only">Recherche</label>
                <div className="relative w-full flex items-center justify-center">
                    <Search strokeWidth={1.25} className="stroke-gris-11 size-6 absolute left-10 max-[1545px]:left-7 max-md:left-5 max-md:size-5" />
                    <input id="recherche-article" type="text" className="bg-gris-1 border border-red-4  block w-[95%] text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 pl-12 p-1.5 placeholder:text-gris-6 max-896:text-sm max-[1545px]:pl-10 max-lg:pl-11 max-md:pl-9" placeholder="Rechercher un article..." />
                </div>
                <button className="relative size-10 rounded-full bg-gris-3 flex items-center justify-center cursor-pointer transition duration-200 ease-in-out hover:bg-gris-4">
                    <Image src={"/filter.svg"} width={24} height={10} alt={"filtre"} />
                </button>
            </div>   
            <div className="w-full grid grid-cols-6 gap-4 max-2xl:grid-cols-5 max-xl:grid-cols-4 max-896:!grid-cols-3 max-[512px]:!grid-cols-2">
                <ArticleCard
                    id={1}
                    nom="Beauty Planet 15-Piece Professional brush"
                    image={"/image-12.jpg"}
                    prix={14000}
                    notaion={4.5}
                    estFavori={true}
                />                
                <ArticleCard
                    id={2}
                    nom="Palette concealer higioher et blush aille"
                    image={"/image-13.jpg"}
                    prix={10000}
                    notaion={4.0}
                    estFavori={false}
                />                
                <ArticleCard
                    id={3}
                    nom="kit 25 pinceaux professionnel Vicc"
                    image={"/image-14.jpg"}
                    prix={38000}
                    notaion={4.0}
                    estFavori={true}
                />                
                <ArticleCard
                    id={4}
                    nom="beauty by Ad fond de teint"
                    image={"/image-15.jpg"}
                    prix={10000}
                    notaion={3.0}
                    estFavori={true}
                />                
                <ArticleCard
                    id={1}
                    nom="Beauty Planet 15-Piece Professional brush"
                    image={"/image-12.jpg"}
                    prix={14000}
                    notaion={4.5}
                    estFavori={true}
                />                
                <ArticleCard
                    id={2}
                    nom="Palette concealer higioher et blush aille"
                    image={"/image-13.jpg"}
                    prix={10000}
                    notaion={4.0}
                    estFavori={false}
                />                
                <ArticleCard
                    id={3}
                    nom="kit 25 pinceaux professionnel Vicc"
                    image={"/image-14.jpg"}
                    prix={38000}
                    notaion={4.0}
                    estFavori={true}
                />                
                <ArticleCard
                    id={4}
                    nom="beauty by Ad fond de teint"
                    image={"/image-15.jpg"}
                    prix={10000}
                    notaion={3.0}
                    estFavori={true}
                />                
                <ArticleCard
                    id={1}
                    nom="Beauty Planet 15-Piece Professional brush"
                    image={"/image-12.jpg"}
                    prix={14000}
                    notaion={4.5}
                    estFavori={true}
                />                
                <ArticleCard
                    id={2}
                    nom="Palette concealer higioher et blush aille"
                    image={"/image-13.jpg"}
                    prix={10000}
                    notaion={4.0}
                    estFavori={false}
                />                
                <ArticleCard
                    id={3}
                    nom="kit 25 pinceaux professionnel Vicc"
                    image={"/image-14.jpg"}
                    prix={38000}
                    notaion={4.0}
                    estFavori={true}
                />                
                <ArticleCard
                    id={4}
                    nom="beauty by Ad fond de teint"
                    image={"/image-15.jpg"}
                    prix={10000}
                    notaion={3.0}
                    estFavori={true}
                />                
            </div>         
        </div>
    )
}

export default CategorieDetailBody
