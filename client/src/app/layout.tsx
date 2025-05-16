import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/web/Navbar";

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
        {children}
      </body>
    </html>
  );
}
