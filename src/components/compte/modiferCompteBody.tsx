"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import CameraIcon from '../../../public/svg/camera'
import CompteNavbar from '../navbar/compteNavbar'
import { useAuth } from '@/hooks/useAuth'
import { useForm } from 'react-hook-form'
import { UtilisateurType } from '@/types/utilisateurType'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { baseUrl } from '@/constant/baseUrl'
import { toast } from 'react-toastify'

const ModiferCompteBody = () => {     
    const { register, handleSubmit, reset } = useForm<UtilisateurType>({})
    const { isAuthenticated, isLoading, refetchUtilisateur, utilisateur } = useAuth()  
    const [isRequestLoading, setIsRequestLoading] = React.useState<boolean>(false);
    const router = useRouter();
    
    useEffect(() => {
        if(!isLoading) {
            if (isAuthenticated === false) {            
                router.push("/connexion");
            }

            if(utilisateur) {
                reset({
                    nomClient: utilisateur.nomClient,
                    prenomClient: utilisateur.prenomClient,
                    telephone: utilisateur.telephone,
                    email: utilisateur.email
                })
            }        
        }        

    }, [utilisateur, reset, isAuthenticated, router, isLoading])
    
    const changerImage = (file: FileList | null) => {

        if(!file) {            
            return;
        }

        const formData = new FormData();
        formData.append("file", file[0]);
        formData.append("folder", "images/");

        const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            throw new Error("NEXT_PUBLIC_CLOUD_NAME ou NEXT_PUBLIC_UPLOAD_PRESET est manquant dans .env.local");
        }

        formData.append("upload_preset", uploadPreset);
        formData.append("cloud_name", cloudName);        

        axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData,
        ).then(res => {
            if(res.status === 200) {
                toast("Informations modifiées avec succès", {
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

                setIsRequestLoading(true)

                axios.patch(
                    `${baseUrl}/modifier`,
                    {
                        "img": res.data.secure_url
                    },
                    {
                        withCredentials: true
                    }
                ).then(response => {
                    if(response.status === 200) {
                        toast("Informations modifiées avec succès", {
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
                        
                        refetchUtilisateur()
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
                }).finally(() => setIsRequestLoading(false));
            }
        }).catch(() => {
            toast.error(
                "Une erreur est survenue, veuillez réessayer plus tard",
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
        })

    }

    const modifierCompte = (data: UtilisateurType) => {
        setIsRequestLoading(true)
        axios.patch(
            `${baseUrl}/modifier`,
            data,
            { withCredentials: true }
        ).then((res) => {
            if(res.data.status === 200) {
                toast("Informations modifiées avec succès", {
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
                
                refetchUtilisateur()
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
        }).finally(() => setIsRequestLoading(false));
    }

    return (
        <div className='overflow-x-hidden relative px-[100px] pt-32 py-6 w-screen h-screen flex items-start justify-center gap-4 max-xl:px-[60px] max-896:flex-wrap max-896:pt-20 max-896:pb-0 max-896:!px-4'>            
            <div className='w-4/5 h-full flex items-start justify-center gap-8 max-lg:w-[90%] max-896:!w-full'>
                <CompteNavbar />
                <div className='border border-red-3 p-4 rounded-3xl bg-red-1 w-3/5 flex flex-col items-center justify-start gap-4 max-896:w-full max-896:bg-transparent max-896:border-none max-896:p-0'>
                    {
                        utilisateur?.img ? 
                            <label htmlFor='img-change' className='cursor-pointer relative size-24 aspect-square flex items-center justify-center rounded-full group'>
                                <input disabled={isRequestLoading} onChange={e => changerImage(e.target.files)} id='img-change' type="file" accept='image/*' className="sr-only" />
                                <Image src={utilisateur.img} fill alt="user-icon" className='object-cover rounded-full' />
                                <div className='absolute bottom-0 right-0 rounded-full p-0.5 size-8 bg-gris-1 flex items-center justify-center transition duration-300 ease-in group-hover:scale-90'>
                                    <div className='relative rounded-full bg-red-4 size-full flex items-center justify-center'>
                                        <CameraIcon className='size-4' />
                                    </div>
                                </div>
                            </label>
                        :
                            <label htmlFor='img-change' className='cursor-pointer relative bg-red-7 size-24 aspect-square flex items-center justify-center rounded-full group'>
                                <input disabled={isRequestLoading} onChange={e => changerImage(e.target.files)} id='img-change' type="file" accept='image/*' className="sr-only" />
                                <span className='text-bold text-red-1 text-xl'>{utilisateur?.nomClient?.charAt(0) || "U"}</span>
                                <div className='absolute bottom-0 right-0 rounded-full p-0.5 size-8 bg-gris-1 flex items-center justify-center transition duration-300 ease-in group-hover:scale-90'>
                                    <div className='relative rounded-full bg-red-4 size-full flex items-center justify-center'>
                                        <CameraIcon className='size-4' />
                                    </div>
                                </div>
                            </label>
                    }
                    <form onSubmit={handleSubmit(modifierCompte)} className="w-full flex flex-col items-center justify-start gap-4">
                        <div className="w-full flex flex-col items-start justify-center gap-4">
                            <span className="text-2xl text-gris-12 font-normal max-xl:text-lg">Information Personnelle</span>
                            <div className="w-full flex items-center">   
                                <label htmlFor="nom" className="sr-only">Nom</label>
                                <input {...register("nomClient")} id="nom" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" placeholder="Nom" />                                        
                            </div>
                            <div className="w-full flex items-center">   
                                <label htmlFor="prenom" className="sr-only">Prénom</label>
                                <input {...register("prenomClient")} id="prenom" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" placeholder="Prénom" />                                        
                            </div>
                        </div>
                        <div className="w-full flex flex-col items-start justify-center gap-4">
                            <span className="text-2xl text-gris-12 font-normal max-xl:text-lg">Contact</span>
                            <div className="w-full flex items-center">   
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input {...register("email")} id="email" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" placeholder="Email" />                                        
                            </div>
                            <div className="w-full flex items-center">   
                                <label htmlFor="telephone" className="sr-only">Téléphone</label>
                                <input {...register("telephone")} id="telephone" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" placeholder="Téléphone" />                                        
                            </div>
                        </div>
                        <button disabled={isRequestLoading} type='submit' className="bg-red-8 w-full rounded-full font-bold text-gris-12 text-2xl py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                            max-lg:text-sm max-896:w-[96%] max-896:absolute max-896:bottom-4">
                            Enregistrer
                        </button>   
                    </form>                    
                </div>
            </div>
        </div>
    )
}

export default ModiferCompteBody
