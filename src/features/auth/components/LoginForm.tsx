import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { LoginFormProps } from "../auth.types";

export default function LoginForm({
  handleChange,
  handleSubmit,
  loginForm,
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

        <Button className="bg-accent text-white" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
