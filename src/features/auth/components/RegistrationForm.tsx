import React from "react";
import { RegistrationFormProps } from "../auth.types";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Loader from "@/components/Loader";

export default function RegistrationForm({
  handleChange,
  handleSubmit,
  registrationForm,
  isSubmitting,
}: RegistrationFormProps) {
  return (
    <div className="flex justify-center items-center">
      <form
        className="w-full max-w-[50ch] flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          label="Email"
          name="email"
          type="text"
          value={registrationForm.email}
          onChange={handleChange}
          required
        />
        <Input
          label="First Name"
          name="firstName"
          type="text"
          value={registrationForm.firstName}
          onChange={handleChange}
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          type="text"
          value={registrationForm.lastName}
          onChange={handleChange}
          required
        />
        <Input
          label="Username"
          name="username"
          type="text"
          value={registrationForm.username}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={registrationForm.password}
          onChange={handleChange}
          required
        />
        <Input
          label="Re-type Password"
          name="confirmPassword"
          type="password"
          value={registrationForm.confirmPassword}
          onChange={handleChange}
          required
        />
        <a href="/login" className="text-end text-sm">
          Back to Login
        </a>
        <Button
          className="bg-accent text-white flex justify-center"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader /> : "Register"}
        </Button>
      </form>
    </div>
  );
}
