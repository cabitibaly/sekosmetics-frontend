"use client"
import { baseUrl } from '@/constant/baseUrl'
import { InscriptionField, inscriptionSchema } from '@/types/inscriptionField'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const Inscription = () => {
    const [isVisibleOld, setIsVisibleOld] = useState<boolean>(false)
    const [isVisibleNew, setIsVisibleNew] = useState<boolean>(false)
    const [confirmerMdp, setConfirmerMdp] = useState<string>("")
    const { register, handleSubmit, formState: { errors } } = useForm<InscriptionField>({
        resolver: zodResolver(inscriptionSchema)
    })        
    const router = useRouter()

    const incription = async (data: InscriptionField) => {
        if(data.motDePasse.length < 8) {
            toast.info(
                "Le mot de passe doit contenir au moins 8 caractères", 
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            )
            return
        }

        if(data.motDePasse !== confirmerMdp) {
            toast.info(
                "Les mots de passe ne correspondent pas", 
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            )
            return
        }

        if(data.telephone.length < 8) {
            toast.info(
                "Le numéro de téléphone doit contenir au moins 8 chiffres", 
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            )
            return
        }        

        axios.post(
            `${baseUrl}/inscription`,
            { 
                ...data
            }
        ).then((res) => {
            if(res.status === 201) {
                toast.success(
                    "Votre compte a bien été créé",
                    {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    }                    
                )

                setTimeout(() => {
                    router.push("/connexion")
                }, 3000)
            }
        }).catch((err) => {
            toast.error(
                err.response.data.message || "Une erreur est survenue, veuillez réessayer plus tard",
                {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                }
            )
        })
    }

    const onError = () => {                  
        Object.values(errors).forEach((error) => {             
            toast.info(error.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        })
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='relative w-3/5 h-full flex items-center justify-center max-xl:w-1/2 max-896:hidden'>
                <Image src={"/inscription.jpg"} fill alt='login' className='absolute size-full object-cover'/>
            </div>
            <div className='p-8 relative w-2/5 h-full overflow-auto flex flex-col items-center justify-center gap-12 max-xs:justify-start max-xl:w-1/2 max-896:inscription max-896:w-full!'>
                <h1 className='text-2xl text-gris-12 font-bold text-center'>Bienvenue chez <span className='text-red-8'>Sekosmetics</span></h1>
                <form onSubmit={handleSubmit(incription, onError)} className='w-full flex flex-col items-center justify-center gap-6'>
                    <div className='w-full grid grid-cols-2 items-center justify-center gap-4 max-xs:grid-cols-1'>
                        <div className="w-full flex flex-col items-start justify-center gap-2">   
                            <label htmlFor="nomClient" className="text-gris-9 text-base font-bold">Nom</label>
                            <input {...register("nom", {required: true})} id="nomClient" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-12 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 px-1.5 py-2 placeholder:text-gris-6 max-896:text-base" placeholder="Votre nom..." />                                        
                        </div>
                        <div className="w-full flex flex-col items-start justify-center gap-2">   
                            <label htmlFor="prenomClient" className="text-gris-9 text-base font-bold">Prénom</label>
                            <input {...register("prenom", {required: true})} id="prenomClient" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-12 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 px-1.5 py-2 placeholder:text-gris-6 max-896:text-base" placeholder="Votre prénom..." />                                        
                        </div>
                    </div>
                    <div className='w-full grid grid-cols-2 items-center justify-center gap-4 max-xs:grid-cols-1'>
                        <div className="w-full flex flex-col items-start justify-center gap-2">   
                            <label htmlFor="telephone" className="text-gris-9 text-base font-bold">Téléphone</label>
                            <input {...register("telephone", {required: true})} id="telephone" type="text-" className="bg-gris-1 border border-red-4  block w-full text-gris-12 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 px-1.5 py-2 placeholder:text-gris-6 max-896:text-base" placeholder="votre numero de téléphone..." />                                        
                        </div>
                        <div className="w-full flex flex-col items-start justify-center gap-2">   
                            <label htmlFor="email" className="text-gris-9 text-base font-bold">Email</label>
                            <input {...register("email", {required: true})} id="email" type="email" className="bg-gris-1 border border-red-4  block w-full text-gris-12 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 px-1.5 py-2 placeholder:text-gris-6 max-896:text-base" placeholder="example@example.com" />                                        
                        </div>
                    </div>
                    <div className="relative w-full flex flex-col items-start gap-2">   
                        <label htmlFor="mdp-1" className="text-gris-9 text-base font-bold">Mot de passe</label>
                        <input {...register("motDePasse", {required: true})} id="mdp-1" type={isVisibleNew ? "text" : "password"} className="bg-gris-1 border border-red-4  block w-full text-gris-12 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 px-1.5 py-2 placeholder:text-gris-6 max-896:text-base" placeholder="12345678" />
                        <button type="button" onClick={() => setIsVisibleNew(!isVisibleNew)} className="absolute z-50 right-3 top-[42px] cursor-pointer">
                            {
                                isVisibleNew ? <Eye strokeWidth={1.5} className="size-6 stroke-red-8 max-896:size-5" /> : <EyeOff strokeWidth={1.5} className="size-6 stroke-gris-12 max-896:size-5" />
                            }                                
                        </button>                        
                    </div>
                    <div className="relative w-full flex flex-col items-start gap-2">   
                        <label htmlFor="mdp-2" className="text-gris-9 text-base font-bold">Mot de passe (confirmation)</label>
                        <input value={confirmerMdp} onChange={e => setConfirmerMdp(e.target.value)} id="mdp-2" type={isVisibleOld ? "text" : "password"} className="bg-gris-1 border border-red-4  block w-full text-gris-12 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 px-1.5 py-2 placeholder:text-gris-6 max-896:text-base" placeholder="12345678"/>
                        <button type="button" onClick={() => setIsVisibleOld(!isVisibleOld)} className="absolute z-50 right-3 top-[42px] cursor-pointer">
                            {
                                isVisibleOld ? <Eye strokeWidth={1.5} className="size-6 stroke-red-8 max-896:size-5" /> : <EyeOff strokeWidth={1.5} className="size-6 stroke-gris-12 max-896:size-5" />
                            }                                
                        </button>                        
                    </div>
                    <button type='submit' className="bg-red-8 w-full rounded-full font-bold text-gris-12 text-lg py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-896:text-base">
                        S&apos;inscrire
                    </button>
                    <div className='w-full flex items-center justify-center'>
                        <p className='text-gris-12 text-sm max-896:text-center'>Vous avez déjà un compte ? <Link href={"/connexion"} className='text-red-8 cursor-pointer hover:underline max-896:text-red-10'>Se connecter</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Inscription
