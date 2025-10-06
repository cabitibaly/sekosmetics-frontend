import Footer from "@/components/accueil/footer"
import Navbar from "@/components/navbar/navbar"
import Topbar from "@/components/navbar/topbar"
import OffrePromoBody from "@/components/offre-promo/offrePromoBody"

const OffrePromo = () => {
    return (
        <>
            <Topbar href="/" title="Offres Promos" />
            <Navbar isSidebarVisible={false} />
            <OffrePromoBody /> 
            <Footer />
        </>
    )
}

export default OffrePromo
