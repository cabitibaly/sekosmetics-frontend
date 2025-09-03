"use client"
import { useState } from 'react'
import CompteNavbar from '../navbar/compteNavbar'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { MotDePasseField, MotDePasseSchema } from '@/types/changerMotDePasse'
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'react-toastify'
import axios from 'axios'
import { baseUrl } from '@/constant/baseUrl'

const ModifierMotDePasse = () => {
    const [isVisibleOld, setIsVisibleOld] = useState<boolean>(false)
    const [isVisibleNew, setIsVisibleNew] = useState<boolean>(false)
    const {register, handleSubmit, reset, formState: {errors}} = useForm<MotDePasseField>({
        resolver: zodResolver(MotDePasseSchema)
    })

    const changerMotDePasse = (data: MotDePasseField) => {
        axios.patch(
            `${baseUrl}/modifier-son-mot-de-passe`,
            data,
            {
                withCredentials: true
            }
        ).then((res) => {
            if(res.data.status === 200) {
                toast("Mot de passe modifié avec succès", {
                    type: "success",
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });

                reset({
                    ancienMotDePasse: "",
                    nouveauMotDePasse: ""
                })
            }
        }).catch((err) => {
            toast.error(
                err.response?.data.message || "Une erreur est survenue, veuillez réessayer plus tard",
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

    const onError = () => {        
        Object.values(errors).forEach((error) => {
            toast.error(error.message, {
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
        <div className='overflow-x-hidden relative px-[100px] pt-32 py-6 w-screen h-screen flex items-start justify-center gap-4 max-xl:px-[60px] max-896:flex-wrap max-896:pt-20 max-896:pb-0 max-896:!px-4'>            
            <div className='w-4/5 h-full flex items-start justify-center gap-8 max-lg:w-[90%] max-896:!w-full'>
                <CompteNavbar />
                <div className='border border-red-3 p-4 rounded-3xl bg-red-1 w-3/5 max-h-full flex flex-col items-center justify-start gap-4 max-896:w-full max-896:bg-transparent max-896:border-none max-896:p-0'>
                    <form onSubmit={handleSubmit(changerMotDePasse, onError)} className="w-full h-full flex flex-col items-center justify-start gap-4">
                        <div className="w-full flex flex-col items-start justify-center gap-4">
                            <span className="text-2xl text-gris-12 font-normal max-xl:text-lg max-896:hidden">Mot de passe</span>
                            <div className="relative w-full flex flex-col items-start gap-2">   
                                <label htmlFor="ancien" className="hidden text-lg text-gris-12 font-normal max-896:block">Mot de passe actuel</label>
                                <input {...register("ancienMotDePasse", {required: true, minLength: 8})} id="ancien" type={isVisibleOld ? "text" : "password"} className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-2 placeholder:text-gris-6 max-896:text-base" placeholder="Mot de pass actuel..." />
                                <button type="button" onClick={() => setIsVisibleOld(!isVisibleOld)} className="absolute z-50 right-3 top-2 cursor-pointer max-896:top-11">
                                    {
                                        isVisibleOld ? <Eye strokeWidth={1.5} className="size-6 stroke-red-8 " /> : <EyeOff strokeWidth={1.5} className="size-6 stroke-gris-12 " />
                                    }                                
                                </button>
                            </div>
                            <div className="relative w-full flex flex-col items-start gap-2">   
                                <label htmlFor="ancien" className="hidden text-lg text-gris-12 font-normal max-896:block">Nouveau mot de passe</label>
                                <input {...register("nouveauMotDePasse", {required: true, minLength: 8})} id="ancien" type={isVisibleNew ? "text" : "password"} className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-2 placeholder:text-gris-6 max-896:text-base" placeholder="Nouveau mot de passe..." />
                                <button type="button" onClick={() => setIsVisibleNew(!isVisibleNew)} className="absolute z-50 right-3 top-2 cursor-pointer max-896:top-11">
                                    {
                                        isVisibleNew ? <Eye strokeWidth={1.5} className="size-6 stroke-red-8 " /> : <EyeOff strokeWidth={1.5} className="size-6 stroke-gris-12 " />
                                    }                                
                                </button>
                            </div>
                        </div>
                        <button type='submit' className="bg-red-8 w-full rounded-full font-bold text-gris-12 text-2xl py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                            max-lg:text-sm max-896:w-[96%] max-896:absolute max-896:bottom-4">
                            Modifier
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModifierMotDePasse
