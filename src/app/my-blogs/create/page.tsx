import Breadcrumbs from "@/ui/Breadcrumbs";
import { CreateBlogPayload } from "@/features/blog/blog.types";
import BlogFormClient from "@/features/blog/components/BlogFormClient";

export default function Create() {
  const initialValues: CreateBlogPayload = {
    title: "",
    description: "",
    contents: "",
    author_id: "",
    slug: "",
  };

  return (
    <>
      <header>
        <Breadcrumbs
          breadcrumbs={[
            { label: "My blogs", href: "/my-blogs" },
            { label: "create", href: "/create", active: true },
          ]}
        />
        <h1 className="text-2xl font-semibold mb-5">Create your own blog</h1>
        <article>
          <BlogFormClient initialValues={initialValues} />
        </article>
      </header>
    </>
  );
}
