import ModifierMotDePasse from '@/components/compte/modifierMotDePasse'
import Navbar from '@/components/navbar/navbar'
import Topbar from '@/components/navbar/topbar'
import React from 'react'

const MotDePasse = () => {
    return (
        <>
            <Navbar isSidebarVisible={false} inArticle={true} />
            <Topbar href='/compte' title='Mot de passe'/>
            <ModifierMotDePasse />
        </>
    )
}

export default MotDePasse
