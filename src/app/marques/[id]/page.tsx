import Footer from "@/components/accueil/footer";
import MarqueDetailBody from "@/components/marque/marqueDetail/marqueDetailBody";
import MarqueDetailHero from "@/components/marque/marqueDetail/marqueDetailHero";
import Navbar from "@/components/navbar/navbar";
import Topbar from "@/components/navbar/topbar";
interface Props {
    params: {
        id: string
    }
}

const MarqueDetail = async ({params}: Props) => {
    const { id } = await params;

    return (
        <>
            <Topbar href='/categories' title='Zaron' />
            <Navbar isSidebarVisible={false} />
            <MarqueDetailHero id={id} intitule={'Zaron'} />
            <MarqueDetailBody />
            <Footer />
        </>
    )
}

export default MarqueDetail
