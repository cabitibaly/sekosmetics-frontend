"use client"
import Image from "next/image"
import Script from "next/script"

const FacebookPixel = () => {
    return (
        <>
            <Script 
                id="facebook-pixel" 
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `

                    `
                }}
            />
            <noscript>
                <Image 
                    height={1} 
                    width={1} 
                    alt="Facebook pixel" 
                    style={{display: 'none'}}
                    src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
                />
            </noscript>            
        </>
    )
}

export default FacebookPixel
