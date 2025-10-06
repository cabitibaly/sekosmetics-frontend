"use client"
import Footer from "@/components/accueil/footer"
import Navbar from "@/components/navbar/navbar"
import Topbar from "@/components/navbar/topbar"

const PolitiqueRetour = () => {
    return (
        <>
            <Topbar href="/" title="Politique de retour" />
            <Navbar isSidebarVisible={false} />
            <section className='overflow-x-hidden px-[150px] pt-32 py-6 w-screen flex flex-col items-center justify-start gap-8 max-896:pt-20 max-896:pb-36 max-896:!px-4'>
                <div className="bg-transparent w-full flex flex-col items-start justify-start gap-3">
                    <h1 className="text-3xl text-left text-red-8 font-bold">Politique de retour et remboursement</h1>
                    <p className="text-left text-gris-12 text-base font-normal">
                        Nous veillons à vous offrir une qualité irréprochable et à vous livrer un produit fidèle à vos attentes, 
                        en toute confiance.Aucun remboursement, retour ou échange ne pourra être effectué en cas de simple 
                        changement d’avis. Toutefois, si votre commande est erronée, défectueuse ou incomplète, nous vous 
                        invitons à nous contacter dans un délai de 48 heures suivant sa réception afin que nous puissions trouver 
                        une solution rapide.
                    </p>
                    <ul className="px-4 flex flex-col gap-1.5">
                        <li className="list-disc text-left text-gris-12 text-base font-normal">
                            WhatsApp : <span className="text-red-8 font-black">+2250748861829</span>
                        </li>
                        <li className="list-disc text-left text-gris-12 text-base font-normal">
                            Courriel : <span className="text-red-8 font-black">sekosmetics@gmail.com</span>
                        </li>                        
                    </ul>
                    <p className="text-left text-gris-12 text-base font-normal">
                        Veuillez fournir autant de détails que possible sur le problème, y compris votre nom, votre numéro de 
                        commande et le nom des articles concernés.
                    </p>
                    <h2 className="mt-3 text-3xl text-left text-red-8 font-bold">Consigne :</h2>
                    <ul className="px-4 flex flex-col gap-1.5">
                        <li className="list-disc text-left text-gris-12 text-base font-normal">
                            Si vous recevez un article incorrect ou défectueux, merci de ne pas l’utiliser. Dans ce cas, contactez-nous rapidement, car 
                            nous pourrions ne pas être en mesure d’effectuer un remboursement, un retour ou un échange autrement.
                        </li>
                        <li className="list-disc text-left text-gris-12 text-base font-normal">
                            Merci de ne pas jeter un article, sauf si nous vous en donnons expressément l’instruction.
                        </li>                        
                        <li className="list-disc text-left text-gris-12 text-base font-normal">
                            Les produits doivent être non utilisés et dans leur emballage d’origine. Tout retour 
                            ne respectant pas ces conditions pourra être refusé.
                        </li>                        
                    </ul>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default PolitiqueRetour
