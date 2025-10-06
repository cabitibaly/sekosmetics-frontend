import Footer from "@/components/accueil/footer";
import MarqueDetailBody from "@/components/marque/marqueDetail/marqueDetailBody";
import MarqueDetailHero from "@/components/marque/marqueDetail/marqueDetailHero";
import Navbar from "@/components/navbar/navbar";

interface Props {
    params: Promise<{
        id: string
    }>
}

const MarqueDetail = async ({params}: Props) => {
    const { id } = await params;

    return (
        <>            
            <Navbar isSidebarVisible={false} />
            <MarqueDetailHero id={id} />
            <MarqueDetailBody id={id} />
            <Footer />
        </>
    )
}

export default MarqueDetail
