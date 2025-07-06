import { BlogData } from "../blog.types";
import BlogCard from "./BlogCard";

export default function BlogList({ blogs }: { blogs: BlogData[] }) {
  return (
      <div className="flex flex-col gap-4 py-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
  );
}
