import { requireNoAuth } from "@/utils/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireNoAuth();
  return <>{children}</>;
}
