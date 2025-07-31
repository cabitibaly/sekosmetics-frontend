import FavorisBody from "@/components/compte/favorisBody"
import Navbar from "@/components/navbar/navbar"
import Topbar from "@/components/navbar/topbar"

const MesFavoris = () => {
    return (
        <>
            <Navbar isSidebarVisible={false} />
            <Topbar href='/compte' title='Mes Favoris'/>
            <FavorisBody />
        </>
    )
}

export default MesFavoris
