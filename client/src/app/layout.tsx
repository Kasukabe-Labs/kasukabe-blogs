import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/web/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { TanstackProvider } from "@/providers/TansackQueryProvider";
import NavbarProvider from "@/providers/NavbarProvider";
import BreadcrumbLayer from "@/components/web/BreadcrumbLayer";

export const metadata: Metadata = {
  title: {
    default: "Kasukabe Blogs",
    template: "%s | Kasukabe Blogs",
  },
  description: "Minimal blogging application with notion like editor",
  keywords: [
    "blog",
    "blogging",
    "notion",
    "editor",
    "minimal",
    "writing",
    "kasukabe",
  ],
  authors: [{ name: "Kasukabe Blogs" }],
  creator: "Subhraneel Goswami",
  publisher: "Kasukabe Blogs",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kasukabe-blogs-prod.vercel.app",
    title: "Kasukabe Blogs",
    description: "Minimal blogging application with notion like editor",
    siteName: "Kasukabe Blogs",
    images: [
      {
        url: "https://github.com/Kasukabe-Labs/kasukabe-blogs/blob/main/client/public/thumbnail.PNG",
        width: 1200,
        height: 630,
        alt: "Kasukabe Blogs - Minimal blogging application with notion like editor",
        type: "image/png",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Kasukabe Blogs",
    description: "Minimal blogging application with notion like editor",
    images: [
      {
        url: "https://kasukabe-blogs-prod.vercel.app/thumbnail.png",
        alt: "Kasukabe Blogs - Minimal blogging application with notion like editor",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <NavbarProvider />
        <Toaster richColors position="top-right" />
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
