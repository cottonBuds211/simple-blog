import buildSearchURL from "@/utils/buildSearchURL";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export function useSearch(){
    const searchParams = useSearchParams()
    const router = useRouter()
    const [query, setQuery] = useState(searchParams.get('query') || "")

    const handleSearch = useCallback(() => {
        const urlParams = buildSearchURL(searchParams, query);
        router.push(urlParams);
    }, [query, searchParams, router]);


    const handleClear = () => {
        setQuery("");
        const params = new URLSearchParams(searchParams.toString())
        params.delete("query")
        params.delete("page")
        router.push(`?`);
      };
    return {query, setQuery, handleSearch, handleClear, }
}