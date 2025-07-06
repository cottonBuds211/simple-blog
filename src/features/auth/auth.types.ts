import { FormHandlers } from "@/types/handlers"

type LoginFormData= {
    email:string, 
    password:string
}

type RegistrationFormData= RegistrationFormPayload & {
    confirmPassword:string
}

type RegistrationFormPayload={
    email: string
    firstName: string,
    lastName: string,
    username: string
    password:string
}

type LoginFormProps = FormHandlers & {
    loginForm: LoginFormData
}

type RegistrationFormProps = FormHandlers & {
    registrationForm: RegistrationFormData
}



export type {LoginFormData,LoginFormProps, RegistrationFormData, RegistrationFormProps, RegistrationFormPayload}