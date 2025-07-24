import Footer from "@/components/accueil/footer"
import CategorieBody from "@/components/categorie/categorieBody"
import CategoriesHero from "@/components/categorie/categoriesHero"
import Navbar from "@/components/navbar/navbar"
import Topbar from "@/components/navbar/topbar"

const Categories = () => {
    return (
        <>
            <Topbar href="/" title="Categories" />
            <Navbar isSidebarVisible={false} />
            <CategoriesHero />
            <CategorieBody />
            <Footer />
        </>
    )
}

export default Categories
