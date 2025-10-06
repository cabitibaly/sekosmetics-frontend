import z from "zod";

export const MotDePasseSchema = z.object({
    ancienMotDePasse: z.string().min(8, {message: "L'ancien mot de passe est obligatoire et doit contenir au moins 8 caractères"}),
    nouveauMotDePasse: z.string().min(8, {message: "Le nouveau mot de passe est obligatoire et doit contenir au moins 8 caractères"}),
})

export type MotDePasseField = z.infer<typeof MotDePasseSchema>