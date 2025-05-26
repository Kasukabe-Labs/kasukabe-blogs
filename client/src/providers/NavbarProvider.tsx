"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/web/Navbar";

export default function NavbarProvider() {
  const pathname = usePathname();

  if (
    pathname == "/dashboard" ||
    pathname == "/login" ||
    pathname == "/signup"
  ) {
    return null;
  }
  return <Navbar />;
}
