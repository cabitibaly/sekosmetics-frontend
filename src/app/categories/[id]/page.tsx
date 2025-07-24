import Footer from '@/components/accueil/footer';
import CategorieDetailBody from '@/components/categorie/categorieDetail/categorieDetailBody';
import CategorieDetailHero from '@/components/categorie/categorieDetail/categorieDetailHero';
import Navbar from '@/components/navbar/navbar';
import Topbar from '@/components/navbar/topbar'

interface Props {
    params: {
        id: string
    }
}

const CategoriesDetail = async ( {params}: Props) => {
    const { id } = await params;    

    return (
        <>
            <Topbar href='/categories' title='Makeup tools' />
            <Navbar isSidebarVisible={false} />
            <CategorieDetailHero id={id} intitule={'Makeup tools'} />
            <CategorieDetailBody />
            <Footer />
        </>
    )
}

export default CategoriesDetail
