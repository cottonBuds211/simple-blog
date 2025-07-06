"use client";
import { useEffect } from "react";
import Input from "./Input";
import SearchIcon from "./SearchIcon";
import Xicon from "./Xicon";
import { useSearch } from "@/hooks/useSearch";

export default function Search() {
  const { query, setQuery, handleSearch, handleClear } = useSearch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query.trim() === "") {
      handleSearch();
      return;
    }

    const delay = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(delay);
  }, [ query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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
          <button onClick={handleClear}>
            <Xicon className={"text-secondary h-4 w-4"} onClick={handleClear} />
          </button>
        )}
      </div>
      <button
        className={`p-2 rounded-r-md border border-black/10 hover:cursor-pointer ${
          !query.trim()
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "hover:bg-gray-200"
        }`}
        onClick={handleSearch}
        disabled={!query.trim()}
      >
        <SearchIcon className={"text-secondary/80 "} />
      </button>
    </div>
  );
}
