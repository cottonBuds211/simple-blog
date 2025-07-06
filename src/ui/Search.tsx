"use client";
import { useEffect, useState } from "react";
import Input from "./Input";
import SearchIcon from "./SearchIcon";
import { useRouter, useSearchParams } from "next/navigation";
import Xicon from "./Xicon";

export default function Search() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const router = useRouter();

  useEffect(() => {
    const delay = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(delay);
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("query", query);
      params.set("page", "1");
    } else {
      params.delete("query");
      params.set("page", "1");
    }
    router.push(`?${params.toString()}`);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleClear = () => {
    setQuery("");
    router.push(`?`);
  };
  return (
    <div className="flex flex-row w-full mt-2">
      <div className="flex-grow flex flex-row items-center border rounded-l-md focus:outline-none focus-within:ring-inset focus-within:ring-2 focus-within:ring-accent/90 border-black/10 p-2 pl-4">
        <Input
          name="search"
          value={query}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          className="outline-none"
          placeholder="Search..."
        />
        {query && (
          <Xicon className={"text-secondary h-4 w-4"} onClick={handleClear} />
        )}
      </div>
      <button
        className={`p-2 rounded-r-md border border-black/10 hover:cursor-pointer ${
          !query.trim()
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "hover:bg-gray-200"
        }`}
        onClick={handleSearch}
      >
        <SearchIcon className={"text-secondary/80 "} />
      </button>
    </div>
  );
}
