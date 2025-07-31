import RechercheRecenteBody from "@/components/compte/rechercheRecenteBody"
import Navbar from "@/components/navbar/navbar"
import Topbar from "@/components/navbar/topbar"

const RechercheRecente = () => {
    return (
        <>
            <Navbar isSidebarVisible={false} />
            <Topbar href='/compte' title='Recherche récente'/>
            <RechercheRecenteBody />
        </>
    )
}

export default RechercheRecente
