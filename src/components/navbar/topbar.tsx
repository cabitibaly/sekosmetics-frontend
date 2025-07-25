import Image from "next/image"
import Link from "next/link"

interface TopbarProps {
    href: string,
    title: string,
    boutonValidation?: boolean,
    isArtcile?: boolean
}

const Topbar = ({href, title, boutonValidation = false, isArtcile = false}: TopbarProps) => {
    return (
        <div className="fixed z-40 w-screen py-3 px-4 hidden items-center justify-center max-896:flex">
            <Link href={href} className="absolute top-3 left-4 size-10 text-gris-12 text-2xl font-bold max-xl:text-lg">
                <Image src={"/bouton-retour.svg"} fill alt="retour-btn"/>
            </Link>
            {!isArtcile && <div className="max-w-[70%] relative top-1 line-clamp-1 font-jura text-center text-gris-12 text-2xl font-bold">{title}</div>}
            {   
                boutonValidation &&
                <button className="absolute top-3 right-4 size-10 text-gris-12 text-2xl font-bold max-xl:text-lg">
                    <Image src={"/bouton-valide.svg"} fill alt="valide-btn"/>
                </button>
            }
        </div>
    )
}

export default Topbar
