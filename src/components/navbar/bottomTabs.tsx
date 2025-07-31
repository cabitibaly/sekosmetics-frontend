import Image from "next/image"
import Link from "next/link"

interface Props {
    inArticle?: boolean
}

const BottomTabs = ({ inArticle = false }: Props) => {
    return (
        <div className={`fixed left-1/2 z-40 -translate-1/2 bottom-4 w-[91.96%] py-3 px-8 rounded-full border border-red-3 bg-red-1 hidden items-center justify-between gap-16 max-xs:px-4 ${inArticle ? "hidden" : "max-[896px]:flex"}`}>
            <div className="flex items-center justify-between w-[30%]">
                <Link href={"/"} className="size-8 flex items-center justify-center cursor-pointer max-xs:size-6">
                    <Image src={"/home_active.svg"} width={30} height={40} alt="notification-btn"/>
                </Link>
                <Link href={"/recherche"} className="size-8 flex items-center justify-center cursor-pointer max-xs:size-6">
                    <Image src={"/search.svg"} width={30} height={40} alt="notification-btn"/>
                </Link>
            </div>                    
            <Link href={"/panier"} className="absolute left-1/2 -translate-1/2 size-12 rounded-full bg-red-8 flex items-center justify-center cursor-pointer max-xs:size-10">
                <Image src={"/cart.svg"} width={24} height={40} alt="notification-btn"/>
            </Link>
            <div className="flex items-center justify-between w-[30%]">
                <Link href={"/compte/mes-favoris"} className="size-8 flex items-center justify-center cursor-pointer max-xs:size-6">
                    <Image src={"/heart.svg"} width={30} height={40} alt="notification-btn"/>
                </Link>
                <Link href={"/compte"} className="size-8 flex items-center justify-center cursor-pointer max-xs:size-6">
                    <Image src={"/user.svg"} width={30} height={40} alt="notification-btn"/>
                </Link>
            </div>                    
        </div>
    )
}

export default BottomTabs
