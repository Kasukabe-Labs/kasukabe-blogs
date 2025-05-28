"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/web/Navbar";

export default function NavbarProvider() {
  const pathname = usePathname();

  const hideRoutes = [
    "/dashboard",
    "/dashboard/myBlogs",
    "/dashboard/addToSite",
    "/login",
    "/signup",
  ];

  const isDynamicMyBlogRoute =
    pathname.startsWith("/dashboard/myBlogs/") &&
    pathname !== "/dashboard/myBlogs";

  if (hideRoutes.includes(pathname) || isDynamicMyBlogRoute) {
    return null;
  }

  return <Navbar />;
}
