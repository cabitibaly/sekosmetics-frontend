import z from "zod/v3";

export const OffreSchema = z.object({
    idOffre: z.number().optional(),
    imageOffre: z.string().optional(),
    intituleOffre: z.string().min(5, {message: "Intitulé de l'offre invalide"}).max(100, {message: "L'intitulé doit contenir au maximum 100 caractères"}),
    descriptionOffre: z.string().optional(),
    dateDebutOffre: z.date({message: "Date de début invalide"}),
    dateFinOffre: z.date({message: "Date de fin invalide"}),
    valeurReductionOffre: z.number().int().nonnegative({message: "Valeur de réduction invalide"}),
    typeReductionOffre: z.string({message: "Type de réduction invalide"}),
    estActive: z.boolean().optional(),
    dateCreationOffre: z.date({message: "Date de création invalide"}).optional(),
    dateModificationOffre: z.date({message: "Date de modification invalide"}).optional(),
})

export type OffreField = z.infer<typeof OffreSchema>