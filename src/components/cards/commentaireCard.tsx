"use client"
import { Commentaire } from "@/types/articleField"
import Image from "next/image"

interface CommentaireCardProps {
    commentaire: Commentaire
}

const CommentaireCard = ({ commentaire }: CommentaireCardProps) => {


    return (
        <div className="w-full flex flex-col items-center-start justify-center gap-4">
            <div className="w-full flex items-center justify-between gap-4 max-xs:flex-col max-xs:items-start max-xs:gap-2">
                <div className="flex items-center justify-center gap-4">
                    {
                        commentaire.utiliteur.img ? 
                            <div className="relative size-12 rounded-full flex items-center justify-center max-lg:size-10">
                                <Image src={"/profil-1.jpg"} fill alt="profil" className="rounded-full" />
                            </div>
                        :
                            <div className="relative bg-red-6 size-12 rounded-full flex items-center justify-center max-lg:size-10">
                                <span className="text-base text-red-1 font-bold">{commentaire.utiliteur.nomClient.charAt(0)}</span>
                            </div>
                    }                    
                    <span className="text-xl text-gris-12 font-bold text-center max-lg:text-base max-md:text-sm">{commentaire.utiliteur.nomClient} {commentaire.utiliteur.prenomClient}</span>
                </div> 
                <div className="flex items-center justify-center gap-4">
                    <div className="rating">
                        <div className="mask mask-star bg-jaune max-lg:size-4" aria-label="1 star" aria-current={commentaire.notation === 1}></div>
                        <div className="mask mask-star bg-jaune max-lg:size-4" aria-label="2 star" aria-current={commentaire.notation === 2}></div>
                        <div className="mask mask-star bg-jaune max-lg:size-4" aria-label="3 star" aria-current={commentaire.notation === 3}></div>
                        <div className="mask mask-star bg-jaune max-lg:size-4" aria-label="4 star" aria-current={commentaire.notation === 4}></div>
                        <div className="mask mask-star bg-jaune max-lg:size-4" aria-label="5 star" aria-current={commentaire.notation === 5}></div>
                    </div>
                    <span className="text-base text-gris-10 font-bold text-center max-md:text-sm">{new Date(commentaire.dateCreationAvis || "").toLocaleDateString()}</span>
                </div>                   
            </div>
            <div className="w-4/5 text-left text-xl text-gris-12 font-semibold max-lg:w-full max-lg:text-base max-xs:text-sm">
                {commentaire.commentaire}
            </div>
        </div>
    )
}

export default CommentaireCard
