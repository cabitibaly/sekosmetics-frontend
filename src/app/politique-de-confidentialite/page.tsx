"use client"
import Footer from "@/components/accueil/footer"
import Navbar from "@/components/navbar/navbar"
import Topbar from "@/components/navbar/topbar"

const PolitiqueConfidentialite = () => {
    return (
        <>
            <Topbar href="/" title="Politique de confidentialité" />
            <Navbar isSidebarVisible={false} />
            <section className='overflow-x-hidden px-[150px] pt-32 py-6 w-screen flex flex-col items-center justify-start gap-8 max-896:pt-20 max-896:pb-36 max-896:!px-4'>
                <div className="bg-transparent w-full flex flex-col items-start justify-start gap-3">
                    <h1 className="text-3xl text-left text-red-8 font-bold">Politique de confidentialité</h1>
                    <p className="text-left text-gris-12 text-base font-normal">
                        Merci de visiter Sekosmetics. Cette politique de confidentialité vous explique 
                        comment nous collectons, utilisons et protégeons vos informations personnelles lorsque 
                        vous utilisez notre site et nos services.
                    </p>
                    <ul className="px-4 flex flex-col gap-1.5">
                        <li className="list-decimal text-left text-gris-12 text-xl font-bold">
                            Collecte et utilisation des renseignements personnels
                        </li>
                        <p className="text-left text-gris-12 text-base font-normal">
                            Lorsque vous utilisez notre site Web ou bénéficiez de nos services, nous pouvons collecter 
                            les types d&apos;informations personnelles suivants :
                        </p>
                        <ul className="px-4 flex flex-col gap-2">
                            <li className="list-disc text-left text-gris-12 text-base font-normal">
                                Coordonnées : votre nom, votre adresse e-mail, votre numéro de téléphone et votre adresse de livraison.
                            </li>
                            <li className="list-disc text-left text-gris-12 text-base font-normal">
                                Informations sur le compte : nom d’utilisateur, mot de passe et autres informations d’authentification.
                            </li>
                            <li className="list-disc text-left text-gris-12 text-base font-normal">
                                Informations sur la commande : Détails des produits ou services que vous achetez chez nous.
                            </li>
                            <li className="list-disc text-left text-gris-12 text-base font-normal">
                                Informations de communication : toutes les communications, commentaires ou demandes de renseignements que vous nous fournissez.
                            </li>
                        </ul>
                        <li className="mt-3 list-decimal text-left text-gris-12 text-xl font-bold">
                            Utilisation des informations personnelles
                        </li>
                        <p className="text-left text-gris-12 text-base font-normal">
                            Nous collectons et utilisons vos informations personnelles aux fins suivantes :
                        </p>  
                        <ul className="px-4 flex flex-col gap-2">
                            <li className="list-disc text-left text-gris-12 text-base font-normal">
                                Traitement et exécution de vos commandes.
                            </li>
                            <li className="list-disc text-left text-gris-12 text-base font-normal">
                                Communiquer avec vous concernant vos commandes, demandes de renseignements ou autres requêtes.
                            </li>
                            <li className="list-disc text-left text-gris-12 text-base font-normal">
                                Fournir un support client et résoudre tous les problèmes que vous pourriez rencontrer.
                            </li>
                            <li className="list-disc text-left text-gris-12 text-base font-normal">
                                Personnaliser et améliorer votre expérience d’achat.
                            </li>
                            <li className="list-disc text-left text-gris-12 text-base font-normal">
                                Mener des recherches et des analyses pour améliorer nos produits et services.
                            </li>
                        </ul>
                        <li className="mt-3 list-decimal text-left text-gris-12 text-xl font-bold">
                            Sécurité des données
                        </li>
                        <p className="text-left text-gris-12 text-base font-normal">
                            Nous prenons toutes les mesures possibles pour protéger vos informations personnelles. Bien que nous ne 
                            puissions garantir une sécurité totale, nous utilisons des standards fiables pour assurer leur protection.
                        </p>                      
                    </ul>
                    
                </div>
            </section>
            <Footer />
        </>
    )
}

export default PolitiqueConfidentialite
