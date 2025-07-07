import { requireNoAuth } from "@/utils/requireAuth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireNoAuth();
  return <>{children}</>;
}
