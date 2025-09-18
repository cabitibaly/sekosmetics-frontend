import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className='overflow-x-hidden footer mt-8 px-[150px] py-12 w-screen flex flex-col items-center justify-start gap-4 max-2xl:px-[100px] max-xl:px-[60px] max-896:hidden'>
            <div className='w-full flex items-start justify-center gap-4'>
                <div className='w-1/4 flex flex-col items-start justify-center gap-2'>
                    <span className='text-gris-12 text-2xl font-bold'>Sekosmetics</span>
                    <p className='text-left text-gris-12 text-lg font-normal max-lg:text-base'>
                        Fournisseur de produit de beauté de qualité authentique, avec la possible de livrer et expédier partout en Côte d’Ivoire.
                    </p>
                </div>
                <div className='w-3/4 flex items-start justify-end gap-16 max-xl:gap-8 max-xl:justify-between'>                
                    <div className='w-1/4 flex flex-col items-start justify-center gap-4 max-xl:w-1/3'>
                        <span className='text-left text-gris-12 text-2xl font-bold underline uppercase max-lg:text-lg'>Navigation</span>
                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <Link href={"/"} className="text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 max-lg:text-base">Accueil</Link>
                            <Link href={"/article/nouvelle-arrivage"} className="text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 max-lg:text-base">News</Link>
                            <Link href={"/marques"} className="text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 max-lg:text-base">Marques</Link>
                            <Link href={"/categories"} className="text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 max-lg:text-base">Catégories</Link>
                            <Link href={"/offre-promotionnelle"} className="text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 max-lg:text-base">Offres promos</Link>
                        </div>
                    </div>
                    <div className='w-1/4 flex flex-col items-start justify-center gap-4 max-xl:w-1/3'>
                        <span className='text-left text-gris-12 text-2xl font-bold underline uppercase max-lg:text-lg'>Information</span>
                        <div className='w-full flex flex-col items-start justify-center gap-2'>
                            <Link href={"/politique-confidentialite"} className="text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 max-lg:text-base">
                                Politique de confidentialité
                            </Link>
                            <Link href={"/politique-retour"} className="text-gris-10 text-lg font-bold transition duration-200 ease-in hover:text-red-8 max-lg:text-base">
                                Politique de retour et remboursement
                            </Link>
                        </div>
                    </div>
                    <div className='w-1/4 flex flex-col items-start justify-center gap-4 max-xl:w-1/3'>
                        <span className='text-left text-gris-12 text-2xl font-bold underline uppercase max-lg:text-lg'>Suivez-nous</span>
                        <div className='w-full flex items-center justify-start flex-wrap gap-4'>
                            <Link href={"https://www.facebook.com/share/1B4kkGWhAp/?mibextid=wwXIfr"} target='_blank' className=' relative size-10 flex items-center justify-center transition ease-linear hover:translate-y-1 max-xl:size-8'>
                                <Image src={"/facebook.svg"} fill alt="facebook"/>
                            </Link>
                            <Link href={"https://wa.me/message/UL75QO33B64IN1 "} target='_blank' className=' relative size-10 flex items-center justify-center transition ease-linear hover:translate-y-1 max-xl:size-8'>
                                <Image src={"/whatsapp.svg"} fill alt="whatsapp"/>
                            </Link>
                            <Link href={"https://www.instagram.com/beautiful_face_ig?igsh=MTZobDI5cW5jNWhkcA%3D%3D&utm_source=qr"} target='_blank' className=' relative size-10 flex items-center justify-center transition ease-linear hover:translate-y-1 max-xl:size-8'>
                                <Image src={"/instagram.svg"} fill alt="isntagram"/>
                            </Link>
                            <Link href={"https://www.tiktok.com/@beautifulface225?_t=ZM-8zmj6SBIAwo&_r=1"} target='_blank' className=' relative size-10 flex items-center justify-center transition ease-linear hover:translate-y-1 max-xl:size-8'>
                                <Image src={"/tiktok.svg"} fill alt="tiktok"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <hr className='mt-4 mb-2 w-full border-[1px] border-gris-11' />
            <div className='w-full flex items-center justify-center gap-2'>
                <div className='flex items-center justify-center gap-1'>
                    <div className='relative -top-[1px] size-[21px] flex items-center justify-center'>
                        <Image src={"/copyright-1.svg"} fill alt="copyright" />
                    </div>
                    <span className='text-gris-12 text-base font-normal'>
                        Copyright {new Date().getFullYear()} Sekosmetics
                    </span>
                </div> 
                <hr className='rotate-90 w-[20px] border-gris-11' />  
                <span className='text-gris-12 text-base font-normal'>
                    Tous les droits réservés.
                </span>             
            </div>
        </footer>
    )
}

export default Footer
