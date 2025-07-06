import { requireAuth } from "@/utils/auth";

export default async function MyBlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();
  return <>{children}</>;
}
