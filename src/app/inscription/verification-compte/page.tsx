"use client";
import { baseUrl } from '@/constant/baseUrl';
import { renvoyerOtp } from '@/utils/renvoyerOtp';
import axios from 'axios';
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useRef, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const VerificationWrapper = () => {
    const searchParams = useSearchParams()
    const email = searchParams.get("email")
    const inputRefs = useRef<(HTMLInputElement | null )[]>([]);
    const [otp, setOtp] = useState("");  
    const router = useRouter()  

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => { 
        setOtp(prev => {
            const newOtp = [...prev];
            newOtp[index] = e.target.value;
            return newOtp.join('');
        })
    }

    const handleInput = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const { value } = e.currentTarget;

        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        if (value.length === 0 && e.key === "Backspace" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const verifierCompte = () => {
        axios.post(
            `${baseUrl}/verification`,
            {
                code: otp,
            }
        ).then((res) => {
            if(res.status === 200) {
                toast.success(
                    "Votre compte a été vérifié avec succès",
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

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='relative w-3/5 h-full flex items-center justify-center max-xl:w-1/2 max-896:hidden'>
                <Image src={"/otp.jpg"} fill alt='login' className='absolute size-full object-cover'/>
            </div>
            <div className='p-8 relative w-2/5 h-full flex flex-col items-center justify-center gap-12 max-xl:w-1/2 max-896:otp max-896:w-full!'>                
                <div className='overflow-hidden w-full flex flex-col items-center justify-center gap-6 rounded-2xl max-896:w-3/4 max-896:bg-red-1 max-896:p-4 max-xs:gap-3 max-sm:w-full'>
                    <div className="self-start w-full p-2 flex items-center justify-center flex-col gap-4">
                        <h1 className="text-xl font-bold text-red-8 max-970:text-xl ">Vérification d&apos;email</h1>
                        <p className="text-sm text-gris-12 font-memdium text-left">
                            Un code de vérification (OTP) vous a été envoyé au mail suivant <span className='font-bold'>{email}</span>. Veuillez le saisir 
                            ci-dessous pour continuer. Ce code expirera dans 15 minutes.
                        </p>
                    </div>
                    <div className="w-full flex items-center justify-center mb-2 space-x-6 rtl:space-x-reverse max-xs:space-x-2">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className='w-12 aspect-square'>
                                <label htmlFor={`code-${index + 1}`} className="sr-only">
                                    chiffre-{index + 1}
                                </label>
                                <input
                                    onChange={(e) => handleChange(e, index)}
                                    type="text"
                                    id={`code-${index + 1}`}
                                    maxLength={1}
                                    ref={(el) => { (inputRefs.current[index] = el) }}
                                    onKeyUp={(e) => handleInput(e, index)}
                                    className="size-full aspect-square py-3 text-base font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-8 focus:border-red-8"
                                    required
                                />
                            </div>
                        ))}
                    </div>
                    <button onClick={() => verifierCompte()} className="bg-red-8 w-full rounded-full font-bold text-gris-12 text-lg py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-896:text-base">
                        Vérifier
                    </button>
                    <div className="mt-4 text-lg text-gray-600 font-semibold max-xs:text-sm">
                        <span>Vous n&apos;avez pas reçu de code ? </span>
                        <button onClick={() => renvoyerOtp(email)} type="button" className="text-red-8 hover:underline">Renvoyer</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const VerificationCompet = () => {
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
            <VerificationWrapper />
        </Suspense>
    )
}

export default VerificationCompet