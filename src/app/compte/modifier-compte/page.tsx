"use client"
import ModiferCompteBody from '@/components/compte/modiferCompteBody'
import Navbar from '@/components/navbar/navbar'
import Topbar from '@/components/navbar/topbar'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ModifierCompte = () => {  
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter()

    useEffect(() => {
        if(!isAuthenticated && !isLoading) {
            router.push('/connexion')
        }
    }, [isAuthenticated, isLoading, router])

    return (
        <>
            <Navbar isSidebarVisible={false} inArticle={true} />
            <Topbar href='/compte' title='Mon profil'/>
            <ModiferCompteBody />
        </>
    )
}

export default ModifierCompte
