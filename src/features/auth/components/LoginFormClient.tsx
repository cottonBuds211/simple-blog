"use client";
import { useState } from "react";
import LoginForm from "./LoginForm";
import { LoginFormData } from "../auth.types";
import { signIn } from "../auth.services";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginFormClient() {
  const router = useRouter();
  const { login } = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);

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
      setSubmitting(true);
      const result = await signIn(loginForm);
      if (result) {
        login(result);
        alert(`${result?.firstName} log in success.`);
        router.push("/");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      alert(`${errorMessage}`);
      console.error("Error loggin in", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <LoginForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loginForm={loginForm}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
