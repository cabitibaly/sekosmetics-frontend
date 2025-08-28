"use client"
import { useAuth } from "@/hooks/useAuth"

const InfoPersonnelle = () => {
    const { utilisateur } = useAuth()

    return (
        <form onSubmit={e => e.preventDefault()} className="w-full min-h-[65vh] flex flex-col items-center justify-start gap-4 max-896:min-h-auto">
            <div className="w-full flex flex-col items-start justify-center gap-4">
                <span className="text-2xl text-gris-12 font-normal max-896:text-lg">Information Personnelle</span>
                <div className="w-full flex items-center">   
                    <label htmlFor="nom" className="sr-only">Nom</label>
                    <input disabled value={utilisateur?.nomClient ?? ""} id="nom" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" placeholder="Nom" />                                        
                </div>
                <div className="w-full flex items-center">   
                    <label htmlFor="prenom" className="sr-only">Prénom</label>
                    <input disabled value={utilisateur?.prenomClient ?? ""} id="prenom" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" placeholder="Prénom" />                                        
                </div>
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-4">
                <span className="text-2xl text-gris-12 font-normal max-896:text-lg">Contact</span>
                <div className="w-full flex items-center">   
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input disabled value={utilisateur?.email ?? ""} id="email" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" placeholder="Email" />                                        
                </div>
                <div className="w-full flex items-center">   
                    <label htmlFor="telephone" className="sr-only">Téléphone</label>
                    <input disabled value={utilisateur?.telephone ?? ""} id="telephone" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" placeholder="Téléphone" />                                        
                </div>
            </div>
        </form>
    )
}

export default InfoPersonnelle
