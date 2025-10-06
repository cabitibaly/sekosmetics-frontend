"use client"
import { useGetUnCode } from "@/hooks/code-fetch/codeFetch"
import { usePanier } from "@/hooks/usePanier"
import { Code } from "@/types/codeField"
import { formatReduction } from "@/utils/formatReduction"
import React, { useEffect, useState } from "react"

interface ConfirmationProps {        
    setCodeValide: React.Dispatch<React.SetStateAction<Code | null>>
}

const Confirmation = ({setCodeValide}: ConfirmationProps) => {
    const [code, setCode] = useState<string>("")  
    const [total, setTotal] = useState<number>(0)
    const { panier } = usePanier()
    const { code: codePromo, isLoading, refetch } = useGetUnCode(code)           

    useEffect(() => {
        const sousTotal = panier.reduce((acc, curr) => acc + curr.prixTotal, 0)

        if(codePromo) {            
            if(codePromo.typeReductionCode === "LIVRAISON_GRATUITE") {
                setTotal(sousTotal)
            } else if(codePromo.typeReductionCode === "MONTANT_FIXE") {
                setTotal(sousTotal - codePromo.valeurReductionCode)
            } else if(codePromo.typeReductionCode === "POURCENTAGE") {
                setTotal(sousTotal - (codePromo.valeurReductionCode * sousTotal)/100)
            }
            setCodeValide(codePromo  || null)
            return;
        }

        setTotal(sousTotal)

    }, [codePromo, panier, setCodeValide, setTotal, code])

    const handleClick = () => {
        if(!code) return
        refetch()
    }

    return (
        <div className="pt-4 w-full h-[65vh] overflow-y-auto flex flex-col items-start justify-start gap-4 max-896:h-auto">
            <div className="w-full flex items-center justify-between">
                <span className="text-2xl text-gris-12 font-bold max-896:text-lg">Nombre d&apos;article</span>
                <span className="text-2xl text-red-8 font-bold max-896:text-lg">{panier.reduce((acc, curr) => acc + curr.quantiteLigne, 0)}</span>
            </div>
            <div className="border-b border-red-6 pb-4 w-full flex items-center justify-between">
                <span className="text-2xl text-gris-12 font-bold max-896:text-lg">Sous-total</span>
                <span className="text-2xl text-red-8 font-bold max-896:text-lg">{panier.reduce((acc, curr) => acc + curr.prixTotal, 0).toLocaleString()} FCFA</span>
            </div>
            <div className="border-b border-red-6 pb-4 w-full flex items-center justify-between gap-4">
                <div className="w-3/4 flex items-center">   
                    <label htmlFor="code-promo" className="sr-only">Code promo</label>
                    <input value={code} onChange={e => setCode(e.target.value)} id="code-promo" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" placeholder="Entrer un code promotionnelle" />                                        
                </div>
                <button disabled={isLoading} onClick={() => handleClick()} className="cursor-pointer text-2xl text-red-8 hover:underline max-896:text-lg">Appliquer</button>
            </div>
            <div className="w-full flex items-center justify-between">
                <span className="text-2xl text-gris-12 font-bold max-896:text-lg">Réduction</span>
                <span className="text-2xl text-red-8 font-bold max-896:text-lg">{formatReduction(codePromo?.typeReductionCode, codePromo?.valeurReductionCode)}</span>
            </div>
            <div className="w-full flex items-center justify-between">
                <span className="text-2xl text-gris-12 font-bold max-896:text-lg">Total sans frais</span>
                <span className="text-2xl text-red-8 font-bold max-896:text-lg">{total.toLocaleString()} FCFA</span>
            </div>
        </div>
    )
}

export default Confirmation
