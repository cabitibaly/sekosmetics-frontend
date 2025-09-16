"use client"
import { useAuth } from '@/hooks/useAuth'
import { ConnexionField } from '@/types/connexionField'
import { ChevronLeft, Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const Connexion = () => {
    const [isVisibleOld, setIsVisibleOld] = useState<boolean>(false)
    const [ isLoding, setIsLoding ] = useState<boolean>(false)
    const { register, handleSubmit } = useForm<ConnexionField>()
    const { login } = useAuth();    
    const router = useRouter();

    const connexion = async (data: ConnexionField) => {
        if(data.motDePasse.length < 8) {
            alert("Le mot de passe doit contenir au moins 8 caractères")
            return
        }

        setIsLoding(true)

        try {
            login(data);   
        } catch (error) {
            console.log(error)
        } finally{
            setIsLoding(false)
        }       
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='relative w-3/5 h-full flex items-center justify-center max-xl:w-1/2 max-896:hidden'>
                <Image src={"/login.jpg"} fill alt='login' className='absolute size-full object-cover'/>
            </div>
            <div className='px-8 relative w-2/5 h-full flex flex-col items-center justify-center gap-12 max-xl:w-1/2 max-896:connexion max-896:w-full!'>
                <button onClick={() => router.push("/")} className='cursor-pointer absolute top-8 left-8 z-10 flex items-center justify-center gap-1 transition-transform duration-200 ease-linear hover:scale-90'>
                    <ChevronLeft strokeWidth={1.5} className='size-5 stroke-gris-12' />
                    <span className='text-xl text-gris-12 font-bold'>Retour</span>
                </button>
                <h1 className='text-2xl text-gris-12 font-bold text-center'>Bienvenue chez <span className='text-red-8'>Sekosmetics</span></h1>
                <form onSubmit={handleSubmit(connexion)} className='w-full flex flex-col items-center justify-center gap-4'>
                    <div className="w-full flex items-center">   
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input {...register("email", {required: true})} id="email" type="email" className="bg-gris-1 border border-red-4  block w-full text-gris-12 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 px-1.5 py-2 placeholder:text-gris-6 max-896:text-base" placeholder="example@example.com" />                                        
                    </div>
                    <div className="relative w-full flex flex-col items-start gap-2">   
                        <label htmlFor="mdp" className="sr-only">Mot de passe</label>
                        <input {...register("motDePasse", {required: true})} id="mdp" type={isVisibleOld ? "text" : "password"} className="bg-gris-1 border border-red-4  block w-full text-gris-12 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 px-1.5 py-2 placeholder:text-gris-6 max-896:text-base" placeholder="12345678" />
                        <button type="button" onClick={() => setIsVisibleOld(!isVisibleOld)} className="absolute z-50 right-3 top-2.5 cursor-pointer max-896:top-3">
                            {
                                isVisibleOld ? <Eye strokeWidth={1.5} className="size-6 stroke-red-8 max-896:size-5" /> : <EyeOff strokeWidth={1.5} className="size-6 stroke-gris-12 max-896:size-5" />
                            }                                
                        </button>
                        <Link href={"/mot-de-passe-oublie"} className='self-end text-red-8 cursor-pointer hover:underline'>Mot de passe oublié ?</Link>
                    </div>
                    <button disabled={isLoding} type='submit' className="bg-red-8 w-full rounded-full font-bold text-gris-12 text-lg py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-896:text-base">
                        Connexion
                    </button>
                    <div className='w-full flex items-center justify-center'>
                        <p className='text-gris-12 text-sm max-896:text-center'>Vous n&apos;avez pas encore de compte ? <Link href={"/inscription"} className='text-red-8 cursor-pointer hover:underline max-896:text-red-10'>S&apos;inscrire</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Connexion
