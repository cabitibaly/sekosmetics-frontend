import Footer from '@/components/accueil/footer'
import BestsellerBody from '@/components/article/bestseller/bestsellerBody'
import Navbar from '@/components/navbar/navbar'
import Topbar from '@/components/navbar/topbar'
import React from 'react'

const NouvelleArrivage = () => {
    return (
        <>
            <Topbar href="/" title="bestseller" />
            <Navbar isSidebarVisible={false} />
            <BestsellerBody /> 
            <Footer />
        </>
    )
}

export default NouvelleArrivage
