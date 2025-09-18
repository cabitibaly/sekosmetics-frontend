"use client"

import Navbar from "@/components/navbar/navbar"
import Topbar from "@/components/navbar/topbar"
import ValiderBody from "@/components/panier/valider/validerBody"

const CommandeValider = () => {
    return (
        <>            
            <Navbar isSidebarVisible={false} inArticle={true} />
            <Topbar href="/panier" title="Panier valider" />
            <ValiderBody/>
        </>
    )
}

export default CommandeValider
