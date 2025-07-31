import CompteBody from '@/components/compte/compteBody'
import Navbar from '@/components/navbar/navbar'
import Topbar from '@/components/navbar/topbar'
import React from 'react'

const Compte = () => {
    return (
        <>
            <Navbar isSidebarVisible={false} />            
            <Topbar href='/' title='Mon compte'/>   
            <CompteBody />         
        </>
    )
}

export default Compte
