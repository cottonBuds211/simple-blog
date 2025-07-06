import { createClient } from "@/utils/supabase/client";
import {  RegistrationFormPayload } from "./auth.types";
import { User } from "@/types/user";

export async function registerUser({email, username,password,firstName, lastName}: RegistrationFormPayload){
    const supabase = createClient()
    const {data: authData, error: authError} = await supabase.auth.signUp({
        email, password
    })
    if (authError) throw authError
    if(!authData.user) throw new Error("User registration failed!")
    const userId = authData.user.id

    const { error: insertError} = await supabase.from('user_table').insert({
        id: userId,
        firstName,
        lastName,
        username
    })
    if(insertError) throw insertError

    return {success: true}
}

export async function loginUser({
    email, password
}: {email: string, password: string}): Promise<User>{
    const supabase = createClient()
    
    const {data: authData, error:authError} = await supabase.auth.signInWithPassword({
        email, password
    })
    if (authError) throw authError

    const {data:userData, error: userError} = await supabase.from("user_table").select("id, firstName, lastName, username").eq("id", authData.user.id).single()
    if (userError) throw userError

    return userData
}

export async function logoutUser(){
    const supabase = createClient()
    const { error} = await supabase.auth.signOut()
    if (error) throw error
}
