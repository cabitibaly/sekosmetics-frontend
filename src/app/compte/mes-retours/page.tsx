import RetourBody from "@/components/compte/retourBody"
import Navbar from "@/components/navbar/navbar"
import Topbar from "@/components/navbar/topbar"

const Commande = () => {
    return (
        <>
            <Navbar isSidebarVisible={false} />
            <Topbar href='/compte' title='Mes Retours'/>
            <RetourBody />
        </>
    )
}

export default Commande
