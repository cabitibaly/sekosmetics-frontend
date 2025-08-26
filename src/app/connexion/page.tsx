"use client"
import { useAuth } from '@/hooks/useAuth'
import { ConnexionField } from '@/types/connexionField'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const Connexion = () => {
    const [isVisibleOld, setIsVisibleOld] = useState<boolean>(false)
    const { register, handleSubmit } = useForm<ConnexionField>()
    const { login } = useAuth();    

    const connexion = async (data: ConnexionField) => {
        if(data.motDePasse.length < 8) {
            alert("Le mot de passe doit contenir au moins 8 caractères")
            return
        }

        login(data);
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='relative w-3/5 h-full flex items-center justify-center max-xl:w-1/2 max-896:hidden'>
                <Image src={"/login.jpg"} fill alt='login' className='absolute size-full object-cover'/>
            </div>
            <div className='px-8 relative w-2/5 h-full flex flex-col items-center justify-center gap-12 max-xl:w-1/2 max-896:connexion max-896:w-full!'>
                <h1 className='text-2xl text-gris-12 font-bold text-center'>Bienvenue chez <span className='text-red-8'>Sekosmetics</span></h1>
                <form onSubmit={handleSubmit(connexion)} className='w-2/3 flex flex-col items-center justify-center gap-4 max-xl:w-3/4 max-xs:w-full'>
                    <div className="w-full flex items-center">   
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input {...register("email", {required: true})} id="email" type="email" className="bg-gris-1 border border-red-4  block w-full text-gris-12 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 px-1.5 py-2 placeholder:text-gris-6 max-896:text-base" placeholder="example@example.com" />                                        
                    </div>
                    <div className="relative w-full flex flex-col items-start gap-2">   
                        <label htmlFor="ancien" className="sr-only">Mot de passe actuel</label>
                        <input {...register("motDePasse", {required: true})} id="ancien" type={isVisibleOld ? "text" : "password"} className="bg-gris-1 border border-red-4  block w-full text-gris-12 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 px-1.5 py-2 placeholder:text-gris-6 max-896:text-base" placeholder="12345678" />
                        <button type="button" onClick={() => setIsVisibleOld(!isVisibleOld)} className="absolute z-50 right-3 top-2.5 cursor-pointer max-896:top-3">
                            {
                                isVisibleOld ? <Eye strokeWidth={1.5} className="size-6 stroke-red-8 max-896:size-5" /> : <EyeOff strokeWidth={1.5} className="size-6 stroke-gris-12 max-896:size-5" />
                            }                                
                        </button>
                        <Link href={"/mot-de-passe-oublie"} className='self-end text-red-8 cursor-pointer hover:underline'>Mot de passe oublié ?</Link>
                    </div>
                    <button type='submit' className="bg-red-8 w-full rounded-full font-bold text-gris-12 text-lg py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-896:text-base">
                        Connexion
                    </button>
                    <div className='w-full flex items-center justify-center'>
                        <p className='text-gris-12 text-sm max-896:text-center'>Vous n&apos;avez pas encore de compte ? <Link href={"/inscriprion"} className='text-red-8 cursor-pointer hover:underline max-896:text-red-10'>S&apos;inscrire</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Connexion
