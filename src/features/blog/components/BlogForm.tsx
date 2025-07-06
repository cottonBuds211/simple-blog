"use client";
import Button from "../../../ui/Button";
import { BlogFormProps } from "../blog.types";
import Input from "@/ui/Input";
import TextArea from "@/ui/TextArea";

export default function BlogForm({
  formData,
  handleSubmit,
  handleReset,
  handleChange,
  isCreate = false,
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

      <Button type="submit" className="bg-accent text-white ">
        {isCreate ? "Publish" : "Update"}
      </Button>
      <Button type="reset" className="border border-secondary/30 text-secondary">
        {isCreate ? "Clear" : "Reset"}
      </Button>
    </form>
  );
}
