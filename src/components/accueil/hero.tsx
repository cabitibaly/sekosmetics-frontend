import Image from "next/image"
import Link from "next/link"

const Hero = () => {
    return (
        <>
            <section className="overflow-x-hidden relative z-0 px-[150px] bg-red-2 h-screen w-screen flex items-center justify-between overflow-hidden max-2xl:px-[100px] max-xl:h-[70vh] max-xl:px-[60px] max-[896px]:hidden">
                <div className="flex flex-col items-start justify-start gap-4">
                    <h1 className="hero-h1 font-bold text-center text-gris-12 max-xl:text-3xl">Lorem Ipsum</h1>
                    <p className="hero-p text-left text-gris-12 w-[600px] max-2xl:w-[400px] max-xl:text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.
                    </p>
                    <Link href={"/creation-kit"} className="bg-red-8 rounded-full font-bold text-gris-12 text-lg py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                    max-lg:text-sm">
                        Je crée mon kit
                    </Link>
                </div>
                <div className="z-10 absolute bottom-0 right-[150px] flex items-center justify-center aspect-retro w-1/3 h-4/5 max-2xl:w-2/5 max-2xl:right-[100px] max-xl:h-3/4 max-xl:right-[60px]">
                    <Image src={"/hero-img.png"} fill alt="hero-img"/>
                </div>
                <div className="absolute -left-20 -bottom-20 flex items-center justify-center size-68 max-xl:size-48 max-xl:-bottom-10">
                    <Image src={"/deco_1.png"} fill alt="deco-1"/>
                </div>
                <div className="absolute -left-10 top-14 flex items-center justify-center w-48 h-44 rotate-[100deg] max-xl:w-36 max-xl:h-28 max-xl:top-10">
                    <Image src={"/deco_4.png"} fill alt="deco-4"/>
                </div>
                <div className="z-0 absolute right-2/5 top-10 flex items-center justify-center size-48 max-xl:size-36">
                    <Image src={"/deco_3.png"} fill alt="deco-3"/>
                </div>
                <div className="absolute left-96 bottom-56 flex items-center justify-center size-16 max-xl:size-12">
                    <Image src={"/circle.svg"} fill alt="circle"/>
                </div>
                <div className="absolute left-[700px] bottom-4 flex items-center justify-center size-16 max-xl:left-[500px] max-xl:size-12">
                    <Image src={"/star4.svg"} fill alt="star4"/>
                </div>
                <div className="absolute left-[600px] top-40 flex items-center justify-center size-16 max-xl:size-12">
                    <Image src={"/flocon.svg"} fill alt="flocon"/>
                </div>
                <div className="absolute right-20 top-20 flex items-center justify-center size-16 max-xl:size-12">
                    <Image src={"/shuriken.svg"} fill alt="shuriken"/>
                </div>
            </section>
            <section className="pt-20 px-4 relative top-0 w-screen hidden items-center justify-center max-[896px]:flex">
                <div className="rounded-3xl relative w-full aspect-video flex items-center justify-between">
                    <Image src={"/hero-bg.jpg"} fill alt="hero-bg" className="object-cover rounded-3xl"/>
                </div>
                <div className="p-4 w-[90%] aspect-video rounded-3xl absolute flex items-center justify-between">
                    <div className="w-1/2 flex flex-col items-start justify-center gap-4">
                        <p className="hero-mobile-h1 font-bold text-left text-gris-12 max-xl:text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.
                        </p>
                        <Link href={"/creation-kit"} className="bg-red-8 rounded-full font-bold text-gris-12 hero-mobile-btn py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                        max-lg:text-sm">
                            Commencer
                        </Link>
                    </div>
                    <div className="relative w-2/5 h-full flex items-center justify-center">
                        <Image src={"/pencil.png"} fill alt="pencil"/>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero
