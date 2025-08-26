import { useContext } from "react"
import AuthContext from "../contexts/authContext/authContext"

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthContextProvider')
    }

    return {
        utilisateur: context.utilisateur,
        isLoading: context.isLoading,
        isAuthenticated: context.isAuthenticated,
        login: context.login,
        logout: context.logout,
    }
}