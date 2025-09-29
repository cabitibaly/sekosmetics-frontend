import Image from "next/image"

interface Props {
    title: string,
    setTab: (tab: number) => void,
    tab: number
}

const VerificationTopBar = ({title, setTab, tab}: Props) => {
    return (
        <div className="w-screen py-3 px-4 hidden items-center justify-center max-896:flex">
            <button disabled={tab === 1} onClick={() => setTab(tab - 1)} className="cursor-pointer absolute top-3 left-4 size-10 text-gris-12 text-2xl font-bold transition duration-200 ease-in-out hover:-translate-x-2 max-xl:text-lg">
                <Image src={"/bouton-retour.svg"} fill alt="retour-btn"/>
            </button>
            <div className="max-w-[70%] relative top-1 line-clamp-1 text-center text-gris-12 text-2xl font-bold">{title}</div>
        </div>
    )
}

export default VerificationTopBar
