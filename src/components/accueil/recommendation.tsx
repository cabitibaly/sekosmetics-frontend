import Link from "next/link"
import ArticleCard from "../cards/articleCard"

const Recommandation = () => {
    return (
        <section className="px-[150px] py-6 w-screen flex flex-col items-center justify-start gap-4 max-2xl:px-[100px] max-xl:px-[60px] max-xl:py-2 max-896:!px-4 max-896:!pb-28">
            <div className="w-full flex items-center justify-between">
                <span className="span-font-size font-jura text-gris-12 font-bold max-sm:!text-2xl max-xs:!text-lg">Recommandation</span>
                <Link href={"/article?"} className="link-voir-plus font-jura text-red-8 font-bold max-sm:!text-lg max-xs:!text-sm">Voir plus</Link>
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
            </div>
        </section>
    )
}

export default Recommandation
