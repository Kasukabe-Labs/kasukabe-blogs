"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import BreadcrumbLayer from "@/components/web/BreadcrumbLayer";
import AppSidebar from "@/components/web/dashboard/AppSidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("blogs");

  useEffect(() => {
    if (pathname.includes("myBlogs")) {
      setActiveSection("blogs");
    } else if (pathname.includes("addToSite")) {
      setActiveSection("add");
    }
  }, [pathname]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main className="p-4 w-full mx-auto space-y-4 relative">
          <SidebarTrigger className="z-50" />
          <BreadcrumbLayer />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
