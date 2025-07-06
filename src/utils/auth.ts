import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export async function requireAuth(){
    const supabase = await createClient()
    const {data:{user}, error} = await supabase.auth.getUser()

    if (error) {
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