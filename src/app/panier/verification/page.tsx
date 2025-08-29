"use client"
import Navbar from '@/components/navbar/navbar'
import Topbar from '@/components/navbar/topbar'
import VerificationBody from '@/components/panier/verification/verificationBody'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Verification = () => {
    const { isAuthenticated } = useAuth()  
    const router = useRouter();
    
    useEffect(() => {
        if (!isAuthenticated) {            
            router.push("/connexion");
        }
    }, [isAuthenticated, router]);

    return (
        <>
            <Navbar isSidebarVisible={false} inArticle={true} />
            <Topbar href="/panier" title="Info. Personnelle" />
            <VerificationBody />
        </>
    )
}

export default Verification
