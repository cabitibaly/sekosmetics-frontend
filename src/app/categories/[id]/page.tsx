import Footer from '@/components/accueil/footer';
import CategorieDetailBody from '@/components/categorie/categorieDetail/categorieDetailBody';
import CategorieDetailHero from '@/components/categorie/categorieDetail/categorieDetailHero';
import Navbar from '@/components/navbar/navbar';

interface Props {
    params: { id: string }
}

const CategoriesDetail = async ({ params }: Props) => {
    const { id } = await params;    

    return (
        <>            
            <Navbar isSidebarVisible={false} />
            <CategorieDetailHero id={id} />
            <CategorieDetailBody id={id} />
            <Footer />
        </>
    )
}

export default CategoriesDetail
