import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { Providers } from "./providers";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Simple Blog",
  description: "Simple Blog site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="antialiased  box-border h-screen ">
            <Nav />
            <main className="max-w-[80ch] mx-5 md:mx-auto mt-10">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
