import Button from "@/components/Button";
import Input from "@/components/Input";
import { LoginFormProps } from "../auth.types";
import Loader from "@/components/Loader";

export default function LoginForm({
  handleChange,
  handleSubmit,
  loginForm,
  isSubmitting,
}: LoginFormProps) {
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
          value={loginForm.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={loginForm.password}
          onChange={handleChange}
          required
        />
        <a href="/register" className="text-end text-sm">
          Register
        </a>

        <Button
          className="bg-accent text-white"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader /> : "Submit"}
        </Button>
      </form>
    </div>
  );
}
