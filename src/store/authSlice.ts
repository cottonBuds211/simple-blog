import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AuthState{
    user: User | null
    isAuthenticated: boolean
}
const initialState:AuthState = {
    user:null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        loginUser: (state,action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true
        },
        logoutUser: (state) => {
            state.user = null;
            state.isAuthenticated=false
        }
    }
})

export const{loginUser, logoutUser} = authSlice.actions;
export default authSlice.reducer