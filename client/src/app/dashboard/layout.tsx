"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/web/dashboard/AppSidebar";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState("blogs");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main className="flex-1 p-4">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
