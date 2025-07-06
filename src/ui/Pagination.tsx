"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Pagination({
  currentPage,
  totalPage,
}: {
  currentPage: number;
  totalPage: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full flex justify-center gap-2">
      <button
        className="w-8 h-10 flex justify-center items-center text-secondary/70 p-2 border border-black/20 hover:bg-gray-200 hover:cursor-pointer rounded-md text-sm"
        onClick={() => handlePageChange((currentPage - 1).toString())}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page.toString())}
          className={`w-8 h-10 flex justify-center items-center p-2 border hover:bg-gray-200 hover:cursor-pointer rounded-md text-sm
                ${
                  currentPage === page
                    ? "text-accent border-accent"
                    : "text-secondary/70  border-black/20"
                }
            `}
        >
          {page}
        </button>
      ))}
      <button
        className="w-8 h-10 flex justify-center items-center text-secondary/70 p-2 border border-black/20 hover:bg-gray-200 hover:cursor-pointer rounded-md text-sm"
        onClick={() => handlePageChange((currentPage + 1).toString())}
        disabled={currentPage === totalPage}
      >
        &gt;
      </button>
    </div>
  );
}
