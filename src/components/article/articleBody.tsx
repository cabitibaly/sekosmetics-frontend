"use client"
import { useState } from "react"

const ArticleBody = () => {
    const [tab, setTab] = useState<string>("1")
    console.log(tab)

    return (
        <div className="overflow-x-hidden px-[150px] py-6 w-screen flex flex-col items-center justify-start gap-4 max-2xl:px-[100px] max-xl:px-[60px] max-xl:py-2 max-896:!px-4">
            <div className="border-b border-gris-6 pb-6 w-full carousel carousel-start items-center justify-center gap-4 max-lg:justify-start max-lg:pb-3">
                <button onClick={() => setTab("1")} className={`carousel-item rounded-full font-bold text-lg py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                    max-lg:text-sm max-md:text-xs ${tab === "1" ? "bg-red-8 text-gris-12" : "bg-transparent border-transparent text-gris-8"}`}>
                    Description
                </button>
                <button onClick={() => setTab("2")} className={`carousel-item rounded-full font-bold text-lg py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                    max-lg:text-sm max-md:text-xs ${tab === "2" ? "bg-red-8 text-gris-12" : "bg-transparent border-transparent text-gris-8"}`}>
                    specification
                </button>
                <button onClick={() => setTab("3")} className={`carousel-item rounded-full font-bold text-lg py-2 px-4 cursor-pointer ease-in-out transition duration-300 border border-transparent hover:text-red-8 hover:bg-red-1 hover:border-red-6
                    max-lg:text-sm max-md:text-xs ${tab === "3" ? "bg-red-8 text-gris-12" : "bg-transparent border-transparent text-gris-8"}`}>
                    Commenatire
                </button>
            </div>
            <div className="w-4/5 text-left text-xl text-gris-12 font-semibold max-896:text-base max-lg:w-full max-xs:text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris. Duis aute irure dolor in reprehenderit in voluptate velit esse.
            </div>
        </div>
    )
}

export default ArticleBody
