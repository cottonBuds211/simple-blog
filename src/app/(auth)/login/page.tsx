import LoginFormClient from "@/features/auth/components/LoginFormClient";

export default function Login() {
  return (
    <div>
      <h1 className="mb-10 text-2xl font-semibold">Login to your account</h1>
      <LoginFormClient />
    </div>
  );
}
