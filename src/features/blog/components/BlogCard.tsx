"use client";
import { formatDate } from "@/utils/format";
import { BlogData } from "../blog.types";
import { useRouter } from "next/navigation";
import useBlogBasePath from "../hooks/useBlogBasePath";

export default function BlogCard({ blog }: { blog: BlogData }) {
  const router = useRouter();
  const basePath = useBlogBasePath();

  const handleClick = () => {
    router.push(
      `/${basePath === "my-blogs" ? "my-blogs/view" : basePath}/${blog.slug}`
    );
  };
  return (
    <article
      className="w-full h-full flex flex-col gap-2 p-4 border border-black/10 hover:bg-gray-200 cursor-pointer rounded-md transition duration-300"
      onClick={handleClick}
    >
      <header>
        <p className="text-lg text-primary">{blog.title}</p>
        <span className="flex gap-2 text-xs">
          <p className="text-muted">{formatDate(blog.date)}</p>
          <p className="text-accent">{blog.author!.firstName}</p>{" "}
          {blog.updated_date && <p className="text-muted">(Edited)</p>}
        </span>
      </header>
      <p className="text-secondary/90">{blog.description}</p>
    </article>
  );
}
