"use client";

import Button from "@/components/Button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="min-h-screen w-full flex flex-col items-center ">
      <p className="text-lg mt-10">Something went wrong!</p>
      <span className="flex gap-5 mt-5">
        <Button className="bg-primary text-white" onClick={reset}>
          Reload
        </Button>
        <Link
          href={"/"}
          className="border-black/10 border px-4 py-2 rounded-md text-muted"
        >
          Back to blogs
        </Link>
      </span>
    </div>
  );
}
