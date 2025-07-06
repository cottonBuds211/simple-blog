"use client";

import { logoutUser } from "@/features/auth/auth.services";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

export default function Nav() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const handleLogout = async () => {
    await logoutUser();
    logout();
    redirect("/");
  };
  const activeClass = (href: string) => {
    if (href === "/")
      return pathname === "/" || pathname.startsWith("/blog")
        ? "text-accent"
        : "text-muted hover:text-primary";
    return pathname.startsWith(href)
      ? "text-accent"
      : "text-muted hover:text-primary";
  };

  return (
    <nav className=" hover:cursor-pointer w-full h-fit border-b py-4 px-20 border-black/10">
      <span className="flex justify-between max-w-[100ch] w-full mx-auto">
        <Link href="/" className="font-bold uppercase">
          Simple Blog
        </Link>
        <ul className="flex flex-row gap-6 justify-between">
          <li>
            <Link href="/" className={activeClass("/")}>
              All Blogs
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/my-blogs" className={activeClass("/my-blogs")}>
                  My Blogs
                </Link>
              </li>
              <li onClick={handleLogout}>Logout</li>
            </>
          ) : (
            <li>
              <Link href="/login" className={activeClass("/login")}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </span>
    </nav>
  );
}
