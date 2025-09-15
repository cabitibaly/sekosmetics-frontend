import Footer from '@/components/accueil/footer'
import Navbar from '@/components/navbar/navbar'
import Topbar from '@/components/navbar/topbar'
import OffrePromoDetailBody from '@/components/offre-promo/offre-detail/OffrePromoDetailBody'

interface Props {
    params: Promise<{
        id: string
    }>
}

const OffrePromoDetail = async ({params}: Props) => {
    const { id } = await params;

    return (
        <>
            <Topbar href="/" title="Détails Offre" />
            <Navbar isSidebarVisible={false} />
            <OffrePromoDetailBody id={Number(id)} /> 
            <Footer />
        </>
    )
}

export default OffrePromoDetail
