import axios from "axios";
import { toast } from "react-toastify";
 
export const uploadHandler = async (file: FileList | null): Promise<string> => {
    if (!file) {
        toast("Un problème est survenu lors de l'upload de votre image. Veuillez réessayer.", {
        type: "error",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        return "";
    }

    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("folder", "images/");

    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        throw new Error("VITE_CLOUD_NAME ou VITE_UPLOAD_PRESET est manquant dans .env");
    }

    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);

    try {
        const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
        );

        if (res.status === 200) {
        toast("Votre image a été uploadée avec succès.", {
            type: "success",
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        return res.data.secure_url as string;
        }

        return "";
    } catch (error) {
        console.log(error);
        toast("Un problème est survenu lors de l'upload de votre image. Veuillez réessayer.", {
        type: "error",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        return "";
    }
};
