import Navbar from '@/components/navbar/navbar'
import Topbar from '@/components/navbar/topbar'
import PanierBody from '@/components/panier/panierBody'

const Panier = () => {
    return (
        <>
            <Navbar isSidebarVisible={false} inArticle={true} />
            <Topbar href="/" title="Mon panier" />
            <PanierBody  />
        </>
    )
}

export default Panier
