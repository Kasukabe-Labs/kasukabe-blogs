import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/web/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { TanstackProvider } from "@/providers/TansackQueryProvider";

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
    <html lang="en" className="dark">
      <body>
        <Navbar />
        <Toaster richColors position="top-right" />
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
