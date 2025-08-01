import Footer from "@/components/accueil/footer"
import Navbar from "@/components/navbar/navbar"
import Topbar from "@/components/navbar/topbar"
import RechercheBody from "@/components/recherche/rechercheBody"

const Recheche = () => {
    return (
        <>
            <Topbar href="/" title="Recherche" />
            <Navbar isSidebarVisible={false} />
            <RechercheBody />
            <Footer />
        </>
    )
}

export default Recheche
