
export const formatReduction = (typeReductionCode: string | undefined, valeur: number | undefined): string => {
  if (!typeReductionCode || !valeur) return "0 FCFA";

  switch (typeReductionCode) {
    case "LIVRAISON_GRATUITE":
      return "0 FCFA";
    case "POURCENTAGE":
      return `-${valeur}%`;
    case "MONTANT_FIXE":
      return `-${valeur.toLocaleString()} FCFA`;
    default:
      return "0 FCFA";
  }
};