export type ClientInvite = {
  nom: string;
  prenom: string;
  email?: string;
  telephone: string;
};

export type ClientInviteAction =
    | { type: "SET_NOM"; payload: string }
    | { type: "SET_PRENOM"; payload: string }
    | { type: "SET_EMAIL"; payload: string }
    | { type: "SET_TELEPHONE"; payload: string };

export type AdresseInvite = {
    pays: string;
    ville: string;
    commune: string;
    quartier: string
}

export type AdresseInviteAction = 
    | { type: "SET_PAYS"; payload: string }
    | { type: "SET_VILLE"; payload: string }
    | { type: "SET_COMMUNE"; payload: string }
    | { type: "SET_QUARTIER"; payload: string }