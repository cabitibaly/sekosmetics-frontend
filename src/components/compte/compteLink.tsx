import { ChevronRight, Undo2 } from "lucide-react"
import ShoppingBagIcon from "../../../public/svg/shoppingBag"
import Link from "next/link"
import HeartIcon from "../../../public/svg/heartIcon"
import RecentIcon from "../../../public/svg/recentIcon"
import PasswordIcon from "../../../public/svg/passwordIcon"

interface Props {
    title: string,
    href: string,
}

const CompteLink = ({ title, href }: Props) => {
    return (
        <Link href={href} className="cursor-pointer pr-6 w-full flex items-center justify-between gap-4 group">
            <div className="flex items-center justify-center gap-4 max-md:gap-2">
                <div className="size-10 rounded-full bg-gris-3 flex items-center justify-center max-md:size-10">
                    {title === "Mot de passe" && <PasswordIcon color="#1E1F24" className="size-6" />}
                    {title === "Mes Commandes" && <ShoppingBagIcon color="#1E1F24" className="size-6" />}
                    {title === "Mes Retours" && <Undo2 strokeWidth={1} color="#1E1F24" className="size-6" />}
                    {title === "Mes Favoris" && <HeartIcon color="#1E1F24" className="size-6" />}
                    {title === "Recherches récentes" && <RecentIcon color="#1E1F24" className="size-6" />}
                </div>
                <span className="text-gris-12 text-xl font-bold transition duration-200 ease-linear group-hover:text-red-8 max-md:text-base max-360:!text-sm">{title}</span>
            </div>
            <div className="cursor-pointer transition duration-200 ease-in-out group-hover:translate-x-2">
                <ChevronRight strokeWidth={1} className="stroke-gris-12 size-10 max-sm:size-8" />
            </div>
        </Link>
    )
}

export default CompteLink
