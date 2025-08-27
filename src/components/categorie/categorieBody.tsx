"use client"
import Image from "next/image"
import CategorieCard from "../cards/categorieCard"
import { useGetLesCategories } from "@/hooks/categorie-fetch/categorieFetch"
import { MoonLoader } from "react-spinners";

const CategorieBody = () => {    
    const { categories, isLoading } = useGetLesCategories();

    return (

        <div className="overflow-x-hidden px-[150px] py-12 w-screen min-h-screen flex flex-col items-center justify-start gap-12 max-2xl:px-[100px] max-xl:px-[60px] max-lg:py-8 max-896:!px-4 max-896:!pt-20 max-896:!pb-36 max-md:gap-6">
            <div className="w-3/5 flex items-center max-896:w-4/5 max-sm:w-full">   
                <label htmlFor="recherche-categorie" className="sr-only">Recherche</label>
                <div className="relative w-full flex items-center justify-center">
                    <div className="size-5 absolute inset-y-2.5 start-1 flex items-center ps-12 pointer-events-none max-896:size-4 max-896:ps-10 max-896:inset-y-2">
                        <Image src={"/search.svg"} fill alt={"recherche"} />
                    </div>
                    <input id="recherche-categorie" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-12 p-1.5 placeholder:text-gris-6 max-896:text-sm max-896:ps-11" placeholder="Rechercher une catégorie..." />
                </div>
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

            {        
                (categories.length > 0 && !isLoading) &&                    
                    <div className="w-full grid grid-cols-6 items-center justify-center gap-6 max-[1440px]:grid-cols-5 max-1080:grid-cols-4 max-896:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 max-xs:grid-cols-2">
                        {
                            categories.map((categories) => (
                                <CategorieCard
                                    key={categories.idCategorie}
                                    id={categories.idCategorie}
                                    intitule={categories.libelleCategorie}
                                    image={categories.imgCategorie}
                                />
                            ))
                        }                             
                    </div>
            }

            {
                categories.length === 0 && !isLoading && (
                    <div className='w-full h-64 flex items-center justify-center'>
                        <p className='text-gris-12'>Aucune catégorie</p>
                    </div>
                )
            }

        </div>
    )
}

export default CategorieBody
