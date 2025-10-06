import { baseUrl } from "@/constant/baseUrl"
import axios, { AxiosError }  from "axios"
import { toast } from "react-toastify"

export const renvoyerOtp = async (email: string | null): Promise<boolean> => {
    if (!email) return false

    try {
        const res = await axios.post(`${baseUrl}/nouvel-otp`, { email })

        if (res.status === 200) {
            toast.success("Un code OTP a été envoyé par e-mail", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            return true
        }

        return false
        
    } catch (err) {
        const error = err as AxiosError<{ message: string }>

        toast.error(
            error?.response?.data?.message || "Une erreur est survenue, veuillez réessayer plus tard",
            {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
        )
        return false
    }
}
