"use client";
import { useSessionSync } from "@/hooks/useSessionSync";
import React from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useSessionSync();
  return <>{children}</>;
}
