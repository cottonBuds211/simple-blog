"use client";
import { usePathname } from "next/navigation";

export default function useBlogBasePath(){
    const pathname = usePathname();
    const basePath = pathname.includes("my-blogs") ? "my-blogs" : "blog";
    return basePath
}