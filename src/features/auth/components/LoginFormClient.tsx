"use client";
import { useState } from "react";
import LoginForm from "./LoginForm";
import { LoginFormData } from "../auth.types";
import { loginUser } from "../auth.services";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginFormClient() {
  const router = useRouter();
  const { user, login } = useAuth();

  const [loginForm, setLoginForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await loginUser(loginForm);
      if (result) {
        login(result);
        alert(`${result?.firstName} log in success.`);
        router.push("/");
      }
    } catch (error: any) {
      alert(`${error.message}`);
      console.error("Error loggin in", error);
    }
  };

  return (
    <>
      <LoginForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loginForm={loginForm}
      />
    </>
  );
}
