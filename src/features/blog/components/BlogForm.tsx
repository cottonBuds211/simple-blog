"use client";
import Loader from "@/components/Loader";
import Button from "../../../components/Button";
import { BlogFormProps } from "../blog.types";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";

export default function BlogForm({
  formData,
  handleSubmit,
  handleReset,
  handleChange,
  isCreate = false,
  isSubmitting,
}: BlogFormProps) {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <Input
        label="Title"
        name="title"
        value={formData.title}
        type="text"
        onChange={handleChange}
        required
      />
      <Input
        label="Description"
        name="description"
        value={formData.description}
        type="text"
        onChange={handleChange}
        required
      />
      <TextArea
        label="Contents"
        name="contents"
        value={formData.contents}
        rows={5}
        onChange={handleChange}
        required
      />

      <Button
        type="submit"
        className="bg-accent text-white "
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader /> : isCreate ? "Publish" : "Update"}
      </Button>
      <Button
        type="reset"
        className="border border-secondary/30 text-secondary"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader /> : isCreate ? "Clear" : "Reset"}
      </Button>
    </form>
  );
}
