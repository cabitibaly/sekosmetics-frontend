"use client"
import { useGetUneCommande } from "@/hooks/commande-fetch/commandeFetch"
import { ImagePlus, X } from "lucide-react"
import RetourArticleCard from "../cards/RetourArticleCard"
import { useState } from "react"
import { ImageArticle } from "@/types/articleField"
import { uploadHandler } from "@/utils/uploadHandler"
import Image from "next/image"

interface RetourModalProps {
    isModalOpen: boolean
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    ligneId: number | null,
    commandeId: number
}

const RetourModal = ({isModalOpen, setIsModalOpen, ligneId, commandeId}: RetourModalProps) => {       
    const [images, setImages] = useState<ImageArticle[]>(Array(4).fill({urlImage: ""})); 
    const { commande } = useGetUneCommande(commandeId)
    const ligne = commande?.lignesCommande.find(l => l.idLigne === ligneId)

    const onChangeImage = async (file: FileList | null, index: number) => {
        const url = await uploadHandler(file);
        setImages(prev => prev.map((img, i) =>
            i === index ? { ...img, urlImage: url } : img
        ));
    }

    const onRemoveImage = (index: number) => {
        setImages(prev => prev.map((image, i) => i === index ? {urlImage: ""} : image));
    }

    return (
        <div onClick={() => setIsModalOpen(!isModalOpen)} className='fixed top-0 left-0 z-50 p-4 bg-gris-12/60 w-full h-full flex items-center justify-center'>
            <div onClick={e => e.stopPropagation()} className="relative bg-red-1 rounded-3xl w-1/2 py-4 h-full flex flex-col items-center justify-start gap-4 max-xl:w-3/5 max-lg:w-4/5 max-md:w-full">
                <div className="border-b border-gris-4 pb-4 px-8 w-full flex items-center justify-between gap-4 max-896:px-4">
                    <span className="text-gris-12 text-2xl font-bold max-lg:text-xl max-896:!text-lg">Faire un retour</span>
                    <button onClick={() => setIsModalOpen(!isModalOpen)} className="cursor-pointer">
                        <X strokeWidth={1.5} className="stroke-gris-12 size-8 max-896:size-6" />
                    </button>
                </div>
                <div className="pb-4 w-full h-[84.5%] overflow-auto flex flex-col items-center justify-start gap-4">
                    <div className="px-8 w-full flex flex-col items-start justify-center gap-4 max-896:px-4">
                        <span className='text-xl text-gris-12 font-bold max-lg:text-xl max-896:!text-base'>Article concerné</span>
                        <RetourArticleCard
                            ligne={ligne!}
                        />
                    </div>
                    <div className="px-8 w-full flex flex-col items-start justify-center gap-4 max-896:px-4">                    
                        <label htmlFor="raison" className='text-xl text-gris-12 font-bold max-lg:text-xl max-896:!text-base'>La raison du retour</label>
                        <textarea id="raison" rows={4} className="border border-red-4 block p-4 w-full h-48 text-base text-gris-12 bg-red-1 rounded-3xl resize-none outline-none focus:ring-red-6 focus:border-red-6" placeholder="Quelle est la raison ?"></textarea>
                    </div>
                    <div className="px-8 w-full flex flex-col items-start justify-center gap-4 max-896:px-4">
                        <span className='text-xl text-gris-12 font-bold max-lg:text-xl max-896:!text-base'>Preuves</span>
                        <div className="w-full grid grid-cols-4 items-center justify-start gap-4 max-896:grid-cols-3 max-xs:grid-cols-2">
                            {
                                images.map((image, index) => (
                                    image.urlImage !== "" ?
                                        <div key={index} className="relative w-full aspect-square rounded-3xl flex items-center justify-center max-xs:rounded-xl">
                                            <button onClick={() => onRemoveImage(index)} className={`absolute -top-1 -right-1 cursor-pointer bg-rouge-9 size-5 aspect-square rounded-full flex items-center justify-center`}>
                                                <X className="size-4 stroke-gris-1"/>
                                            </button>
                                            <div className="relative size-full aspect-square object-cover rounded-3xl max-xs:rounded-xl">
                                                <Image src={image.urlImage} fill alt="img" className="rounded-3xl max-xs:rounded-xl" />
                                            </div>                                        
                                        </div>
                                    :
                                        <label key={index} htmlFor={`img-${index+1}`} className="cursor-pointer border border-red-6 w-full flex-1 aspect-square rounded-3xl flex flex-col items-center justify-center max-xs:rounded-xl"> 
                                            <ImagePlus strokeWidth={1.5} className="size-8 stroke-red-8" />
                                            <input onChange={(e) => onChangeImage(e.target.files, index)} type="file" accept="image/png, image/jpeg, image/jpg, image/webp" id={`img-${index+1}`} className="sr-only" />
                                        </label> 
                                ))
                            }
                        </div>
                    </div>
                </div>                    
                <div className="absolute bottom-0 rounded-b-3xl border border-red-3 px-8 py-4 w-full flex items-center justify-between gap-4 max-896:px-4">
                    <button onClick={() => setIsModalOpen(!isModalOpen)} className={`rounded-full font-bold bg-red-2 flex items-center justify-center text-gris-12 text-lg py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-red-3 hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-lg:text-base`}>
                        Annulé
                    </button>
                    <button className={`rounded-full font-bold bg-red-8 flex items-center justify-center text-gris-12 text-lg py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-lg:text-base`}>
                        Appliquer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RetourModal
