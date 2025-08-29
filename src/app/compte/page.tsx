"use client"
import CompteBody from '@/components/compte/compteBody'
import Navbar from '@/components/navbar/navbar'
import Topbar from '@/components/navbar/topbar'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Compte = () => {
    const { isAuthenticated } = useAuth()  
    const router = useRouter();
    
    useEffect(() => {
        if (!isAuthenticated) {            
            router.push("/connexion");
        }
    }, [isAuthenticated, router]);

    return (
        <>
            <Navbar isSidebarVisible={false} />            
            <Topbar href='/' title='Mon compte'/>   
            <CompteBody />         
        </>
    )
}

export default Compte
