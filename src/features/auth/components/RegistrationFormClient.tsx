"use client";
import { useState } from "react";
import { RegistrationFormData } from "../auth.types";
import RegistrationForm from "./RegistrationForm";
import { registerUser } from "../auth.services";
import { useRouter } from "next/navigation";

export default function RegistrationFormClient() {
  const router = useRouter();

  const [registrationForm, setRegistrationForm] =
    useState<RegistrationFormData>({
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRegistrationForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { confirmPassword, ...userData } = registrationForm;
      if (userData.password !== confirmPassword) {
        throw Error("Password does not match!");
      }
      const result = await registerUser(userData);

      if (result) {
        router.push("/login");
        alert("Registration success");
      }
    } catch (error: any) {
      alert(`${error.message}`);
      console.error("Error in register", error);
    }
  };

  return (
    <>
      <RegistrationForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        registrationForm={registrationForm}
      />
    </>
  );
}
