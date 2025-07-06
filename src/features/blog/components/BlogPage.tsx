"use client";
import { formatDate } from "@/utils/format";
import { BlogData } from "../blog.types";
import Breadcrumbs from "@/ui/Breadcrumbs";
import useBlogBasePath from "../hooks/useBlogBasePath";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { deleteBlog } from "../blog.services";
import { usePathname, useRouter } from "next/navigation";

export default function BlogPage({ blog }: { blog: BlogData }) {
  const basePath = useBlogBasePath();
  const { user } = useAuth();
  const router = useRouter();
  const blogOwner = user?.id === blog.author?.id;
  const pathname = usePathname();

  const handleDelete = async (id: string) => {
    try {
      const deleteConfirm = confirm("Are you sure you want to delete blog!");
      if (deleteConfirm) {
        await deleteBlog(id);
        alert("Blog deleted!");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      alert(`${errorMessage}`);
      console.error("Error delete blog.", error);
    } finally {
      router.push("/my-blogs");
    }
  };

  return (
    <article className="flex flex-col gap-4">
      <Breadcrumbs
        breadcrumbs={[
          {
            label: `${basePath === "my-blogs" ? "My blogs" : "Blogs"}`,
            href: `/${basePath}`,
          },
          {
            label: `${blog.slug}`,
            href: `/${basePath === "my-blogs" ? "my-blogs/view" : basePath}/${
              blog.slug
            }`,
            active: true,
          },
        ]}
      />
      <header>
        <span className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-2xl text-primary">{blog.title}</h1>{" "}
          {blogOwner && pathname.startsWith("/my-blogs") && (
            <div className="flex gap-2">
              <Link
                className="hover:border-b border-dotted text-secondary"
                href={`/my-blogs/edit/${blog.slug}`}
              >
                Edit
              </Link>
              <button
                className="hover:border-b text-red-400 border-dotted hover:cursor-pointer"
                onClick={() => {
                  handleDelete(blog.id);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </span>
        <span className="flex flex-col md:flex-row md:gap-4 text-sm text-muted">
          <p>
            Author:{" "}
            <span className="text-accent/80">{blog.author!.firstName}</span>
          </p>
          <p>
            Date:
            <span className="text-accent/80">{formatDate(blog.date)}</span>
          </p>
          {blog.updated_date && <p>Edited: {formatDate(blog.updated_date)}</p>}
        </span>
      </header>
      <p className="text-secondary whitespace-pre-line mt-10">
        {blog.contents}
      </p>
    </article>
  );
}
