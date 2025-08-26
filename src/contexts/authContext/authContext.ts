"use client"
import { createContext } from "react";
import type { ConnexionField } from "../../types/connexionField";
import type { UtilisateurType } from "../../types/utilisateurType";

interface AuthContextType {
    utilisateur: UtilisateurType | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (data: ConnexionField) => void;
    logout: () => void;    
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;