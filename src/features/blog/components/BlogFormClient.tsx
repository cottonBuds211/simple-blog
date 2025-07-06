"use client";
import { usePathname } from "next/navigation";
import {
  BlogFormData,
  CreateBlogPayload,
  UpdateBlogPayload,
} from "../blog.types";
import BlogForm from "./BlogForm";
import { useState } from "react";
import { createBlog, updateBlog } from "@/features/blog/blog.services";
import { generateSlug } from "@/utils/generateSlug";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function BlogFormClient({
  initialValues,
}: {
  initialValues: BlogFormData;
}) {
  const pathname = usePathname();
  const [formData, setFormData] = useState<BlogFormData>(initialValues);
  const { user } = useAuth();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const slug = generateSlug(formData.title!);
    const payload = {
      ...formData,
      slug,
      author_id: user!.id,
    };
    try {
      if (pathname.includes("/create")) {
        await createBlog(payload as CreateBlogPayload);
      } else {
        await updateBlog({
          ...payload,
          id: formData.id,
          updated_at: new Date(),
        } as UpdateBlogPayload);
      }
      alert("Success");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      alert(`${errorMessage}`);
      console.error("Error creating blog", error);
    } finally {
      router.push("/my-blogs");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(initialValues);
  };

  return (
    <BlogForm
      formData={formData}
      handleSubmit={handleSubmit}
      handleReset={handleReset}
      handleChange={handleChange}
      isCreate={pathname.includes("create")}
    />
  );
}
