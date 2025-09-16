import type { Metadata } from "next";
import { Comfortaa, Jura } from "next/font/google";
import "./globals.css";
import { PanierProvider } from "@/contexts/panierContext";
import { KitProvider } from "@/contexts/kitContext";
import AuthProvider from "@/contexts/authContext/authProvider";
import { QueryProvider } from "@/contexts/tanstackQuery/queryProvider";
import { ToastContainer } from "react-toastify";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const jura = Jura({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Sekocosmetics",
  description: "une application de e-commerce de cosmétiques",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${comfortaa.className} ${jura.className}`}
      >
        <QueryProvider>
          <AuthProvider>
            <PanierProvider>
              <KitProvider>
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
