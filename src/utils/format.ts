export function formatDate(date: Date | string){
    return new Date(date).toLocaleTimeString("en-US", {
        year:"numeric",
        month:"short",
        day:"numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true, 
    })
}