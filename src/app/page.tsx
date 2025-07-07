import BlogList from "@/features/blog/components/BlogList";
import { getAllBlogs } from "@/features/blog/blog.services";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import NotFound from "@/components/NotFound";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { query, page } = await searchParams;
  const searchQuery = typeof query === "string" ? query : undefined;
  const currentPage = typeof page === "string" ? Number(page) : 1;

  const { blogs, totalPages } = await getAllBlogs({
    query: searchQuery,
    page: page,
  });

  return (
    <>
      <header>
        <h1 className="text-2xl font-bold">Check out these blogs</h1>
        <Search />
      </header>
      <BlogList blogs={blogs} />
      {totalPages > 1 ? (
        <Pagination totalPage={totalPages} currentPage={currentPage} />
      ) : (
        <NotFound />
      )}
    </>
  );
}
