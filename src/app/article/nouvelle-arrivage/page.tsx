import Footer from '@/components/accueil/footer'
import Navbar from '@/components/navbar/navbar'
import Topbar from '@/components/navbar/topbar'
import NouvelleArrivageBody from '@/components/article/nouvelle-arrivage/nouvelleArrivageBody'
import React from 'react'

const NouvelleArrivage = () => {
    return (
        <>
            <Topbar href="/" title="Nouvelle arrivage" />
            <Navbar isSidebarVisible={false} />
            <NouvelleArrivageBody /> 
            <Footer />
        </>
    )
}

export default NouvelleArrivage
