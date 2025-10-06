"use client"
import Navbar from '@/components/navbar/navbar'
import Topbar from '@/components/navbar/topbar'
import VerificationBody from '@/components/panier/verification/verificationBody'

const Verification = () => {

    return (
        <>
            <Navbar isSidebarVisible={false} inArticle={true} />
            <Topbar href="/panier" title="Info. Personnelle" />
            <VerificationBody />
        </>
    )
}

export default Verification
