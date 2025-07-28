
const AdresseLivraison = () => {
    return (
        <div className="w-full flex flex-col items-start justify-center gap-4">
            <div className="w-full flex items-center justify-between">
                <span className="text-2xl text-gris-12 font-normal max-896:text-lg">Adresse livraison</span>
                <button className="cursor-pointer text-lg text-red-8 transition hover:font-bold max-lg:text-sm">Ajouter</button>                
            </div>            
            <div className="border border-red-4 p-5 rounded-3xl w-full flex items-start justify-start gap-4">                
                <input type="radio" name="radio-5" className="radio bg-transparent border-red-4 checked:bg-transparent checked:border-red-6 checked:text-red-8" defaultChecked />
                <div className="w-full h-full flex flex-col gap-1">
                    <span className="text-lg text-gris-12 font-medium">Adresse 1</span>
                    <div className="w-full flex flex-col">
                        <span className="text-base text-gris-8 font-medium">Côte d&apos;Ivoire</span>
                        <span className="text-base text-gris-8 font-medium">Abidjan</span>
                        <span className="text-base text-gris-8 font-medium">Adjamé</span>
                        <span className="text-base text-gris-8 font-medium">Makan Traoré</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdresseLivraison
