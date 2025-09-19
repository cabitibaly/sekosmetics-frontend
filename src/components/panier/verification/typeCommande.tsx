"use client"

interface TypeCommandeProps {
    setLivreAujourdhui: React.Dispatch<React.SetStateAction<boolean>>
    livreAujourdhui: boolean
}

const TypeCommande = ({setLivreAujourdhui, livreAujourdhui}: TypeCommandeProps) => {     

    return (
        <div className="w-full min-h-[65vh] pt-4 flex flex-col items-center justify-start gap-4 max-896:min-h-auto">
            <div className="w-full">
                <input checked={livreAujourdhui} onChange={e => setLivreAujourdhui(e.target.checked)} id={`aujourdhui`} type="checkbox" name="radio-5" className="sr-only peer" />
                <label htmlFor={`aujourdhui`} className="cursor-pointer border border-red-4 p-5 rounded-3xl w-full flex items-center justify-start gap-4 transition duration-200 ease-in-out peer-checked:border-red-6 max-md:rounded-2xl max-md:p-3">                     
                    <div className="aspect-square size-6 border border-red-6 rounded-full flex items-center justify-center">
                        <div className={`size-4 rounded-full transition duration-200 ease-in-out ${livreAujourdhui ? "bg-red-8" : "bg-transparent"}`}></div>
                    </div>
                    <span className="text-lg text-gris-12 font-medium max-896:text-base">
                        Livré au aujourd&apos;hui
                    </span>                 
                </label>
            </div>            
            <div className="w-full text-base text-gris-12 font-medium">
                Les frais de livraison sont comprise entre 1500 FCFA et 2500 FCFA.
            </div>
            {    
                livreAujourdhui &&
                <div className="w-full text-base text-red-10 font-medium">
                    Un numéro de téléphone sera afficher lorsque vous aurez confirmé votre commande.
                    Vous devez le contacter pour planifier la livraison.
                </div>
            }
        </div> 
    )
}

export default TypeCommande
