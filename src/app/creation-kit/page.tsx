"use client"
import KitBody from '@/components/creation-kit/kitBody'
import KitNavbar from '@/components/navbar/kitNavbar'
import Topbar from '@/components/navbar/topbar'
import { useKit } from '@/hooks/useKit'
import { usePanier } from '@/hooks/usePanier'
import React from 'react'
import { toast } from 'react-toastify'

const CreationKit = () => {
    const { viderKit, kit } = useKit()
    const { ajouterLignesKit } = usePanier()

    const ajouterAuPanier = () => {
        ajouterLignesKit(kit)
        viderKit()

        toast.success(
            "Article ajouté au panier",
            {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }
        )
    }

    return (
        <>
            <Topbar href="/" title="Création de kit" boutonValidation validationFn={ajouterAuPanier} />
            <KitNavbar validationFn={ajouterAuPanier} />
            <KitBody />
        </>
    )
}

export default CreationKit
