"use client"
import Navbar from '@/components/navbar/navbar'
import Topbar from '@/components/navbar/topbar'
import VerificationBody from '@/components/panier/verification/verificationBody'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

const Verification = () => {
    const { isAuthenticated, isLoading } = useAuth()  
    const router = useRouter();
    
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {  
            toast.info("Vous devez être connecté pour accéder à cette page");               
            router.push("/connexion");
        }
    }, [isAuthenticated, router, isLoading]);

    return (
        <>
            <Navbar isSidebarVisible={false} inArticle={true} />
            <Topbar href="/panier" title="Info. Personnelle" />
            <VerificationBody />
        </>
    )
}

export default Verification
