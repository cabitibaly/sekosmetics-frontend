import Footer from '@/components/accueil/footer'
import MarqueBody from '@/components/marque/marqueBody'
import MarqueHero from '@/components/marque/marqueHero'
import Navbar from '@/components/navbar/navbar'
import Topbar from '@/components/navbar/topbar'
import React from 'react'

const Marques = () => {
    return (
        <>
            <Topbar href="/" title="Marques" />
            <Navbar isSidebarVisible={false} />
            <MarqueHero />
            <MarqueBody />
            <Footer />
        </>
    )
}

export default Marques
