"use client"
import { baseUrl } from '@/constant/baseUrl'
import { renvoyerOtp } from '@/utils/renvoyerOtp'
import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MoonLoader } from 'react-spinners'
import { toast } from 'react-toastify'

interface ResetPasswordField {
    code: string
    nouveauMotDePasse: string
}

const RenitialiseMotDePasseWrapper = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get("email")
    const [isVisibleNew, setIsVisibleNew] = useState<boolean>(false)
    const { register, handleSubmit } = useForm<ResetPasswordField>()
    const router = useRouter();


    const modifierMotDePasse = (data: ResetPasswordField) => {

        if(!data.nouveauMotDePasse || !data.code) {
            toast.info(
                "Veuillez saisir un nouveau mot de passe et le code OTP", 
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

        if(data.nouveauMotDePasse.length < 8) {
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

        axios.patch(
            `${baseUrl}/reinitialiser-son-mot-de-passe`,
            {
                ...data 
            }
        ).then((res) => {
            if(res.status === 200) {
                toast("Mot de passe modifié avec succès", {
                    type: "success",
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });

                setTimeout(() => {
                    router.push("/connexion")
                }, 3000)
            }
        }).catch((err) => {
            toast.error(
                err.response.data.message || "Une erreur est survenue, veuillez réessayer plus tard",
                {
                    type: "error",
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
        });
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='relative w-3/5 h-full flex items-center justify-center max-xl:w-1/2 max-896:hidden'>
                <Image src={"/mdp-reset.jpg"} fill alt='login' className='absolute size-full object-cover'/>
            </div>
            <div className='p-8 relative w-2/5 h-full flex flex-col items-center justify-center gap-12 max-xl:w-1/2 max-896:reset max-896:w-full!'>                
                <form onSubmit={handleSubmit(modifierMotDePasse)} className='overflow-auto w-full max-h-full flex flex-col items-center justify-start gap-4 rounded-2xl max-896:w-3/4 max-896:bg-red-1 max-896:p-4 max-xs:gap-3 max-sm:w-full'>
                    <div className="p-2 flex items-center justify-center flex-col gap-4">
                        <h1 className="text-3xl font-bold text-red-8 text-center max-lg:text-xl ">Réinitialisation de mot de passe</h1>
                        <p className="text-xl text-gris-12 text-left font-memdium max-lg:text-lg max-sm:text-base max-xs:text-sm">
                            Veuillez saisir le code OTP envoyé à l&apos;adresse <span className='font-bold'>{email}</span>, ainsi que votre nouveau mot de passe.
                        </p>
                    </div>
                    <div className="w-full flex flex-col items-start gap-2">   
                        <label htmlFor="otp" className="text-gris-9 text-base font-bold">Code OTP</label>
                        <input {...register("code", {required: true})} id="otp" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-12 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 px-1.5 py-2 placeholder:text-gris-6 max-896:text-base" placeholder="000000" />                                        
                    </div>                    
                    <div className="relative w-full flex flex-col items-start gap-2">   
                        <label htmlFor="mdp-1" className="text-gris-9 text-base font-bold">Nouveau mot de passe</label>
                        <input {...register("nouveauMotDePasse", {required: true})} id="mdp-1" type={isVisibleNew ? "text" : "password"} className="bg-gris-1 border border-red-4  block w-full text-gris-12 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 px-1.5 py-2 placeholder:text-gris-6 max-896:text-base" placeholder="12345678" />
                        <button type="button" onClick={() => setIsVisibleNew(!isVisibleNew)} className="absolute z-50 right-3 top-[42px] cursor-pointer">
                            {
                                isVisibleNew ? <Eye strokeWidth={1.5} className="size-6 stroke-red-8 max-896:size-5" /> : <EyeOff strokeWidth={1.5} className="size-6 stroke-gris-12 max-896:size-5" />
                            }                                
                        </button>                        
                    </div>                   
                    <button type='submit' className="bg-red-8 w-full rounded-full font-bold text-gris-12 text-lg py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-896:text-base">
                        Soumettre
                    </button>
                    <div className="mt-4 text-lg text-gray-600 font-semibold max-xs:text-sm">
                        <span>Vous n&apos;avez pas reçu de code ? </span>
                        <button onClick={async () => await renvoyerOtp(email)} type="button" className="text-red-8 hover:underline">Renvoyer</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const RenitialiseMotDePasse = () => {
    return (
        <Suspense
            fallback={
                <div className='w-screen h-screen flex items-center justify-center'>
                    <MoonLoader
                        color="#FF7993"
                        size={24}
                    />
                </div>
            }
        >
            <RenitialiseMotDePasseWrapper />
        </Suspense>
    )
}

export default RenitialiseMotDePasse