"use client"
import Image from 'next/image'
import React from 'react'
import CameraIcon from '../../../public/svg/camera'
import CompteNavbar from '../navbar/compteNavbar'

const ModiferCompteBody = () => {      

    return (
        <div className='overflow-x-hidden relative px-[100px] pt-32 py-6 w-screen h-screen flex items-start justify-center gap-4 max-xl:px-[60px] max-896:flex-wrap max-896:pt-20 max-896:pb-0 max-896:!px-4'>
            <div className='w-4/5 h-full flex items-start justify-center gap-8 max-lg:w-[90%] max-896:!w-full'>
                <CompteNavbar />
                <div className='border border-red-3 p-4 rounded-3xl bg-red-1 w-3/5 max-h-full flex flex-col items-center justify-start gap-4 max-896:w-full max-896:bg-transparent max-896:border-none max-896:p-0'>
                    <div className='relative size-24 aspect-square flex items-center justify-center rounded-full'>
                        <Image src={"/profil-1.jpg"} fill alt="user-icon" className='object-cover rounded-full' />
                        <div className='absolute bottom-0 right-0 rounded-full p-0.5 size-8 bg-gris-1 flex items-center justify-center'>
                            <div className='relative rounded-full bg-red-4 size-full flex items-center justify-center'>
                                <CameraIcon className='size-4' />
                            </div>
                        </div>
                    </div>
                    <form onSubmit={e => e.preventDefault()} className="w-full h-full flex flex-col items-center justify-start gap-4">
                        <div className="w-full flex flex-col items-start justify-center gap-4">
                            <span className="text-2xl text-gris-12 font-normal max-xl:text-lg">Information Personnelle</span>
                            <div className="w-full flex items-center">   
                                <label htmlFor="nom" className="sr-only">Nom</label>
                                <input id="nom" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" placeholder="Nom" />                                        
                            </div>
                            <div className="w-full flex items-center">   
                                <label htmlFor="prenom" className="sr-only">Prénom</label>
                                <input id="prenom" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" placeholder="Prénom" />                                        
                            </div>
                        </div>
                        <div className="w-full flex flex-col items-start justify-center gap-4">
                            <span className="text-2xl text-gris-12 font-normal max-xl:text-lg">Contact</span>
                            <div className="w-full flex items-center">   
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input id="email" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" placeholder="Email" />                                        
                            </div>
                            <div className="w-full flex items-center">   
                                <label htmlFor="telephone" className="sr-only">Téléphone</label>
                                <input id="telephone" type="text" className="bg-gris-1 border border-red-4  block w-full text-gris-10 text-lg rounded-full outline-none focus:ring-red-7 focus:border-red-7 ps-4 p-1.5 placeholder:text-gris-6 max-896:text-sm" placeholder="Téléphone" />                                        
                            </div>
                        </div>
                        <button className="bg-red-8 w-full rounded-full font-bold text-gris-12 text-2xl py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
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
