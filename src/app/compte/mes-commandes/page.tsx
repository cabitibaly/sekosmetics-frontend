import CommandeBody from "@/components/compte/commandeBody"
import Navbar from "@/components/navbar/navbar"
import Topbar from "@/components/navbar/topbar"

const Commande = () => {
    return (
        <>
            <Navbar isSidebarVisible={false} />
            <Topbar href='/compte' title='Mes Commandes'/>
            <CommandeBody />
        </>
    )
}

export default Commande
