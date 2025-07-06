import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { useAuth } from "@/hooks/useAuth";

export async function requireAuth(){
    const {logout} = useAuth()

    const supabase = await createClient()
    const {data:{user}, error} = await supabase.auth.getUser()

    if (error) {
        logout()
        console.error("Auth error:", error.message);
    }
    if (!user) {
        redirect("/login");
    }
    return user
}
export async function requireNoAuth(){
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()

    if (user) {
        redirect("/");
    }
    return user
}