"use client"
import { useAuth } from "@/hooks/useAuth"
import { ClientInvite, ClientInviteAction } from "@/types/clientInvite"
import React from "react"

interface InfoPersonnelleProps {
    clientInfo: ClientInvite,
    dispatch: React.Dispatch<ClientInviteAction>
}

const InfoPersonnelle = ({clientInfo, dispatch}: InfoPersonnelleProps) => {
    const { utilisateur, isAuthenticated } = useAuth()

    return (
        <form onSubmit={e => e.preventDefault()} className="w-full min-h-[65vh] flex flex-col items-center justify-start gap-4 max-896:min-h-auto">
            <div className="w-full flex flex-col items-start justify-center gap-4">                
                <div className="w-full flex flex-col items-start justify-start gap-4 max-896:gap-2">   
                    <label htmlFor="nom" className="text-base text-gris-12 font-normal max-lg:text-lg max-896:text-base">Nom</label>
                    <input 
                        disabled={isAuthenticated} 
                        value={utilisateur?.nomClient ?? clientInfo.nom} 
                        onChange={e => dispatch({ type: "SET_NOM", payload: e.target.value })} 
                        id="nom" 
                        type="text" 
                        className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" 
                        placeholder="Nom" 
                    />                                        
                </div>
                <div className="w-full flex flex-col items-start justify-start gap-4 max-896:gap-2">   
                    <label htmlFor="prenom" className="text-base text-gris-12 font-normal max-lg:text-lg max-896:text-base">Prénom</label>
                    <input 
                        disabled={isAuthenticated} 
                        value={utilisateur?.prenomClient ?? clientInfo.prenom}
                        onChange={e => dispatch({ type: "SET_PRENOM", payload: e.target.value })}  
                        id="prenom" 
                        type="text" 
                        className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" 
                        placeholder="Prénom" 
                    />                                        
                </div>
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-4">                
                <div className="w-full flex flex-col items-start justify-start gap-4 max-896:gap-2">   
                    <label htmlFor="email" className="text-base text-gris-12 font-normal max-lg:text-lg max-896:text-base">Email</label>
                    <input 
                        disabled={isAuthenticated} 
                        value={utilisateur?.email ?? clientInfo.email} 
                        onChange={e => dispatch({ type: "SET_EMAIL", payload: e.target.value })}  
                        id="email" 
                        type="text" 
                        className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" 
                        placeholder="Email" />                                        
                </div>
                <div className="w-full flex flex-col items-start justify-start gap-4 max-896:gap-2">   
                    <label htmlFor="telephone" className="text-base text-gris-12 font-normal max-lg:text-lg max-896:text-base">Téléphone</label>
                    <input 
                        disabled={isAuthenticated} 
                        value={utilisateur?.telephone ?? clientInfo.telephone}
                        onChange={e => dispatch({ type: "SET_TELEPHONE", payload: e.target.value })}   
                        id="telephone" 
                        type="text" 
                        className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" 
                        placeholder="Téléphone" 
                    />                                        
                </div>
            </div>
        </form>
    )
}

export default InfoPersonnelle
