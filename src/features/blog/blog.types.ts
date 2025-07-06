import { FormHandlers } from "@/types/handlers";
import { User } from "@/types/user";

 interface BlogData{
    id: string,
    title: string,
    description: string,
    contents: string,
    date: string,
    author: User | null, 
    slug: string
    updated_date?: string
}

interface CreateBlogPayload {
    title: string,
    description: string,
    contents: string,
    slug: string,
    author_id: string
}

interface UpdateBlogPayload extends Partial<CreateBlogPayload>{
    id:string,
    updated_at: Date
}

interface BlogFormData extends Partial<UpdateBlogPayload>{
    author?: User | null
}

interface BlogFormProps extends FormHandlers{
    formData: BlogFormData,
    handleReset: () => void;
    isCreate? :boolean
}


export type {BlogData,BlogFormProps, CreateBlogPayload, UpdateBlogPayload, BlogFormData}