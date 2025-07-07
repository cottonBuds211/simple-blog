"use client"
import { loginUser, logoutUser } from "@/store/authSlice"
import { RootState } from "@/store"
import { User } from "@/types/user"
import { useDispatch, useSelector } from "react-redux"
import { signOut } from "@/features/auth/auth.services"

export  function useAuth() {
    const dispatch = useDispatch()
    const user = useSelector((state:RootState)=> state.auth.user)
    const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated)
    

    const login = (userData: User) => {
        dispatch(loginUser(userData))
    }

    const logout = async () => {
        await signOut();
        dispatch(logoutUser())
    }

    return {user, isAuthenticated, login, logout}
}
