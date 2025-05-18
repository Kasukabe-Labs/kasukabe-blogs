import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/web/Navbar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Kasukabe Blogs",
  description: "minimal cms blog platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
