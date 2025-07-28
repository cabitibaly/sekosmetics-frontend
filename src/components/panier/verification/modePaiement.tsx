"use client"

const ModePaiement = () => {
    return (
        <div className="w-full min-h-[65vh] pt-4 flex flex-col items-center justify-start gap-4 max-896:min-h-auto">
            <div className="cursor-pointer border border-red-4 p-5 rounded-3xl w-full flex items-center justify-start gap-4 max-md:rounded-2xl max-md:p-3"> 
                <input id={`mode-paiement`} defaultChecked type="radio" name="radio-5" className="radio bg-transparent border-red-4 peer checked:bg-transparent checked:border-red-6 checked:text-red-8 max-896:radio-sm" />                                                  
                <label htmlFor={`mode-paiement`} className="text-lg text-gris-12 font-medium max-896:text-base">
                    Payer à la livraison
                </label>                 
            </div>
        </div> 
    )
}

export default ModePaiement
