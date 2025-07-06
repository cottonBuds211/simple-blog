import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  console.log(!user);
  if (user) {
    redirect("/");
  }

  return <>{children}</>;
}
