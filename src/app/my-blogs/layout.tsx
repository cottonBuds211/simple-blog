import { requireAuth } from "@/utils/requireAuth";

export default async function MyBlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();
  return <>{children}</>;
}
