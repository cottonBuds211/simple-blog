"use client";
import { useState } from "react";
import { RegistrationFormData } from "../auth.types";
import RegistrationForm from "./RegistrationForm";
import { registerUser } from "../auth.services";
import { useRouter } from "next/navigation";

export default function RegistrationFormClient() {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);

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
      setSubmitting(true);
      const { confirmPassword, ...userData } = registrationForm;
      if (userData.password !== confirmPassword) {
        throw Error("Password does not match!");
      }
      const result = await registerUser(userData);

      if (result) {
        router.push("/login");
        alert("Registration success");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      alert(`${errorMessage}`);
      console.error("Error in register", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <RegistrationForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        registrationForm={registrationForm}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
