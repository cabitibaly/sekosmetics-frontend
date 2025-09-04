import z from "zod";

export const inscriptionSchema = z.object({
    email: z.string({message: "Veuillez saisir une adresse email valide"}),
    motDePasse: z.string({message: "Veuillez saisir un mot de passe valide"}),
    nom: z.string({message: "Veuillez saisir un nom de client valide"}),
    prenom: z.string({message: "Veuillez saisir un prénom de client valide"}),
    telephone: z.string({message: "Veuillez saisir un numéro de téléphone valide"}),
})

export type InscriptionField = z.infer<typeof inscriptionSchema>