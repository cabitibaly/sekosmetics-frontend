"use client"
import { renvoyerOtp } from '@/utils/renvoyerOtp'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const MotDePasseOublie = () => {    
    const [email, setEmail] = useState<string>("")
    const router = useRouter()

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const otpEnvoye = await renvoyerOtp(email)        

        if(otpEnvoye) {
            router.push("/mot-de-passe-oublie/reinitialisation?email=" + email)
        }
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='relative w-3/5 h-full flex items-center justify-center max-xl:w-1/2 max-896:hidden'>
                <Image src={"/mdp-forgot.jpg"} fill alt='login' className='absolute size-full object-cover'/>
            </div>
            <div className='px-8 relative w-2/5 h-full flex flex-col items-center justify-center gap-12 max-xl:w-1/2 max-896:forgot max-896:w-full!'>                
                <form onSubmit={e => submit(e)} className='w-full flex flex-col items-center justify-center gap-4 rounded-2xl max-896:w-3/4 max-896:bg-red-1 max-896:p-4 max-xs:gap-3 max-sm:w-full'>
                    <div className="p-2 flex items-center justify-center flex-col gap-4">
                        <h1 className="text-3xl font-bold text-red-8 max-lg:text-xl ">Mot de passe oublié</h1>
                        <p className="text-xl text-gris-12 text-left font-memdium max-lg:text-lg max-sm:text-base max-xs:text-sm">
                            Saisissez votre adresse e-mail pour recevoir un code de vérification.
                        </p>
                    </div>
                    <div className="w-full flex items-center">   
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} id="email" type="email" className="bg-gris-1 border border-red-4  block w-full text-gris-12 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 px-1.5 py-2 placeholder:text-gris-6 max-896:text-base" placeholder="example@example.com" />                                        
                    </div>                    
                    <button type='submit' className="bg-red-8 w-full rounded-full font-bold text-gris-12 text-lg py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-896:text-base">
                        Soumettre
                    </button>
                </form>
            </div>
        </div>
    )
}

export default MotDePasseOublie
