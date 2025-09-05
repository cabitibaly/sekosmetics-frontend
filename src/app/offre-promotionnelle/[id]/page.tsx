import Footer from '@/components/accueil/footer'
import Navbar from '@/components/navbar/navbar'
import Topbar from '@/components/navbar/topbar'
import OffrePromoDetailBody from '@/components/offre-promo/offre-detail/OffrePromoDetailBody'

const OffrePromoDetail = () => {
    return (
        <>
            <Topbar href="/" title="Détails Offre" />
            <Navbar isSidebarVisible={false} />
            <OffrePromoDetailBody /> 
            <Footer />
        </>
    )
}

export default OffrePromoDetail
