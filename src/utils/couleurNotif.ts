export const couleurNotif = (type: string) => {
    
    switch (type) {
        case "INFO":
            return "bg-blue-400"
        case "ERROR":
            return "bg-red-8"
        case "WARNING":
            return "bg-jaune"
        case "SUCCESS":
            return "bg-vert"
        default:
            return "bg-blue-400"
    }
}