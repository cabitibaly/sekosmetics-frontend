import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";
import { PanierProvider } from "@/contexts/panierContext";
import { KitProvider } from "@/contexts/kitContext";
import AuthProvider from "@/contexts/authContext/authProvider";
import { QueryProvider } from "@/contexts/tanstackQuery/queryProvider";
import { ToastContainer } from "react-toastify";
import "react-photo-view/dist/react-photo-view.css"
import FacebookPixel from "@/components/meta-pixels/facebookPixel";
import FacebookPixelEvents from "@/components/meta-pixels/facebookPixelEvents";


const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Sekocosmetics",
  description: "Un site de recherche de produits de beauté de qualité authentique, avec la possible de livrer et expédier partout en Côte d’Ivoire.",
  keywords: ["produits de beauté", "makeup", "beauty", "maquillage", "soins visage", "cosmetics", "cométiques", "sekosmetics"],
  openGraph: {
    title: "Sekocosmetics",
    description: "Un site de recherche de produits de beauté de qualité authentique, avec la possible de livrer et expédier partout en Côte d’Ivoire.",
    url: "https://www.sekosmetics.com",
    siteName: "Sekosmetics",
    locale: "fr_FR",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${comfortaa.className}`}
      >
        <QueryProvider>
          <AuthProvider>
            <PanierProvider>
              <KitProvider>
                <FacebookPixel />
                <FacebookPixelEvents />
                <ToastContainer />
                {children}
              </KitProvider>
            </PanierProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
