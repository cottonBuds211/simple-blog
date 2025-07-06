import Breadcrumbs from "@/ui/Breadcrumbs";
import BlogFormClient from "@/features/blog/components/BlogFormClient";
import { getBlog } from "@/features/blog/blog.services";
import { SlugPageParams } from "@/types/routes";
import { notFound } from "next/navigation";

export default async function Update({ params }: SlugPageParams) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) {
    notFound();
  }
  return (
    <>
      <header>
        <Breadcrumbs
          breadcrumbs={[
            { label: "My blogs", href: "/my-blogs" },
            { label: `${blog.slug}`, href: `/my-blogs/view/${slug}` },
            { label: "edit", href: "/edit", active: true },
          ]}
        />
        <h1 className="text-2xl font-semibold mb-5">Edit blog</h1>
        <article>
          <BlogFormClient initialValues={blog} />
        </article>
      </header>
    </>
  );
}
