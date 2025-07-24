import Footer from "@/components/accueil/footer"
import ArticleBody from "@/components/article/articleBody"
import ArticleHeader from "@/components/article/articleHeader"
import Navbar from "@/components/navbar/navbar"
import Topbar from "@/components/navbar/topbar"

interface Props {
    params: {
        id: string
    }
}

const ArticleDetail = async ({params}: Props) => {
    const { id } = await params;

    return (
        <>
            <Topbar href="/" title="Marques" isArtcile />
            <Navbar isSidebarVisible={false} inArticle={true} />
            <ArticleHeader id={id} />
            <ArticleBody />
            <Footer />
        </>
    )
}

export default ArticleDetail
