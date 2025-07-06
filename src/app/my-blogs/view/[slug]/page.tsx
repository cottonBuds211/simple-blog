import BlogPage from "@/features/blog/components/BlogPage";
import { getBlog } from "@/features/blog/blog.services";
import { SlugPageParams } from "@/types/routes";
import { notFound } from "next/navigation";
import React from "react";

export default async function Blog({ params }: SlugPageParams) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) {
    notFound();
  }
  return <BlogPage blog={blog} />;
}
