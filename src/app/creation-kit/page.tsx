import KitNavbar from '@/components/navbar/kitNavbar'
import Topbar from '@/components/navbar/topbar'
import React from 'react'

const CreationKit = () => {
    return (
        <>
            <Topbar href="/" title="Création de kit" boutonValidation />
            <KitNavbar />
        </>
    )
}

export default CreationKit
