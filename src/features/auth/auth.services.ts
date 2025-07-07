import { createClient } from "@/utils/supabase/client";
import {  RegistrationFormPayload } from "./auth.types";
import { User } from "@/types/user";
const supabase = createClient()

export async function registerUser({email, username,password,firstName, lastName}: RegistrationFormPayload){
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

export async function getUser(userId: string): Promise<User>{
    
    const {data:userData, error: userError} = await supabase.from("user_table").select("id, firstName, lastName, username").eq("id", userId).single()
    if (userError) throw userError
    if(!userData) throw new Error("User not found!")
        
    return userData
} 

export async function signIn({
    email, password
}: {email: string, password: string}): Promise<User>{
    const supabase = createClient()
    
    const {data: authData, error:authError} = await supabase.auth.signInWithPassword({
        email, password
    })
    if (authError) throw authError
    const userData = await getUser(authData.user.id)
    return userData
}

export async function signOut(){
    const { error} = await supabase.auth.signOut()
    if (error) throw error
}

