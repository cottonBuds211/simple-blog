import BlogList from "@/features/blog/components/BlogList";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { getAllBlogs } from "@/features/blog/blog.services";
import Pagination from "@/components/Pagination";
import NotFound from "@/components/NotFound";
import Search from "@/components/Search";

export default async function MyBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();
  const { query, page } = await searchParams;
  const searchQuery = typeof query === "string" ? query : undefined;
  const currentPage = typeof page === "string" ? Number(page) : 1;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { blogs, totalPages } = await getAllBlogs({
    userId: user!.id,
    query: searchQuery!,
    page: page!,
  });

  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">My blogs</h1>

        <Link
          href={"/my-blogs/create"}
          className="px-4 py-2 bg-accent rounded-md text-white hover:bg-accent/60 transition duration-300"
        >
          New
        </Link>
      </header>
      <Search />
      {totalPages ? (
        <>
          <BlogList blogs={blogs} />
          <Pagination totalPage={totalPages} currentPage={currentPage} />
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
}
