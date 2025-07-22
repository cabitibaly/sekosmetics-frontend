import MarqueSection from "@/components/accueil/marqueSection";
import Hero from "@/components/accueil/hero";
import Navbar from "@/components/navbar/navbar";
import CategorieSection from "@/components/accueil/categorieSection";
import NouvelArrivage from "@/components/accueil/nouvelArrivage";
import Bestseller from "@/components/accueil/bestseller";
import Recommandation from "@/components/accueil/recommendation";


export default function Accueil() {
  return (
    <>
      <Navbar />
      <Hero />
      <MarqueSection />
      <CategorieSection />
      <NouvelArrivage />
      <Bestseller />
      <Recommandation />
    </>
  );
}
