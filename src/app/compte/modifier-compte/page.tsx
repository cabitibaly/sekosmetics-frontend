"use client"
import ModiferCompteBody from '@/components/compte/modiferCompteBody'
import Navbar from '@/components/navbar/navbar'
import Topbar from '@/components/navbar/topbar'

const ModifierCompte = () => {    

    return (
        <>
            <Navbar isSidebarVisible={false} inArticle={true} />
            <Topbar href='/compte' title='Mon profil'/>
            <ModiferCompteBody />
        </>
    )
}

export default ModifierCompte
