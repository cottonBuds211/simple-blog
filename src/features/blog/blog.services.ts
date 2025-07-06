import { BlogData, CreateBlogPayload, UpdateBlogPayload } from "@/features/blog/blog.types";
import { createClient } from "@/utils/supabase/client";

export async function getAllBlogs({userId, query, page="1", pageSize=5} : {userId?:string; query?: string, page?: string | string[], pageSize?:number}): Promise<{blogs: BlogData[]; totalPages: number}>{
    const supabase = createClient()
    const from = (Number(page) - 1) * pageSize
    const to = from + pageSize - 1

    let supabaseQuery = supabase.from("blogs")
            .select(`id, title, description,contents, slug,created_at, updated_at,user_table(id, firstName, lastName, username)`, {count:"exact"})
            .range(from,to)
            .order("created_at", {ascending:false})

    if(query){
        supabaseQuery = supabaseQuery.or(`title.ilike.%${encodeURIComponent(query)}%,description.ilike.%${encodeURIComponent(query)}%`)
    }
    if(userId){
        supabaseQuery = supabaseQuery.eq('author_id', userId)
    }

    const{data,count,error} = await supabaseQuery

    const totalPages = Math.ceil((count ?? 0) / pageSize);

    if(error) throw new Error(`Error fetching blog ${error.message}`)
    const blogs = data.map(blog => (
        {
            id: blog.description,
            title: blog.title,
            description: blog.description,
            contents: blog.contents,
            date: blog.created_at,
            slug: blog.slug,
            updated_date:blog.updated_at,
            author: Array.isArray(blog.user_table) ? blog.user_table[0] : blog.user_table
        }
    ))
    return {blogs, totalPages}
}


export async function getBlog(slug: string):Promise<BlogData | null>{
    const supabase = createClient()
    const {data, error } = await supabase.from("blogs").select(`id, title, description, contents, slug, created_at,updated_at, user_table(id, firstName, lastName, username)`).eq('slug', slug).single()
    if(error) throw new Error(`Error fetching blog ${error.message}`)
    if(!data) return null

    return {
        id: data.id,
        title: data.title,
        description: data.description,
        contents: data.contents,
        date: data.created_at,
        slug: data.slug,
        updated_date: data.updated_at,
        author: Array.isArray(data.user_table) ? data.user_table[0] : data.user_table
    }
}

export async function createBlog(payload: CreateBlogPayload){
    const supabase = createClient()
    const {data, error} = await supabase.from("blogs").insert(payload).select().single()
    if (error) throw new Error(`Error creating blog ${error.message}`)
    
    return data
}

export async function updateBlog(payload: UpdateBlogPayload){
    const cleanPayload = {
        title: payload.title,
        description: payload.description,
        contents: payload.contents,
        slug: payload.slug,
        updated_at: payload.updated_at,
        author_id: payload.author_id
    }
    const supabase = createClient()
    const {data, error} = await supabase.from("blogs").update(cleanPayload).eq('id', payload.id).select().single()
    if (error) throw new Error(`Error updating blog ${error.message}`)
    
    return data
}

export async function deleteBlog(blogId: string){
    const supabase = createClient()
    const {data, error} = await supabase.from("blogs").delete().eq('id', blogId)
    if (error) throw new Error(`Error deleting blog ${error.message}`)
    
    return data
}
