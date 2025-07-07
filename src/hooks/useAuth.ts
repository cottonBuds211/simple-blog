"use client"
import { loginUser, logoutUser } from "@/store/authSlice"
import { RootState } from "@/store"
import { User } from "@/types/user"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { signOut } from "@/features/auth/auth.services"

export  function useAuth() {
    const dispatch = useDispatch()
    const user = useSelector((state:RootState)=> state.auth.user)
    const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated)
    const supabase = createClient()

    useEffect(() => {
        const getSession = async () => {
            const {data:{session}} = await supabase.auth.getSession()
            if(session?.user && !isAuthenticated){
                dispatch(logoutUser())
            }
        }
        getSession()

        const {data:{subscription}} =  supabase.auth.onAuthStateChange(async (event, session) => {
            if(event === "SIGNED_OUT"){
                dispatch(logoutUser())
            }
        })
        return () => subscription.unsubscribe()
    },[dispatch, supabase, isAuthenticated])

    const login = (userData: User) => {
        dispatch(loginUser(userData))
    }

    const logout = async () => {
        await signOut();
        dispatch(logoutUser())
    }

    return {user, isAuthenticated, login, logout}
}
