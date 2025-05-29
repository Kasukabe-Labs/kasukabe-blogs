"use client";

import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { FileText, Pen, Plus, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdOutlineTravelExplore } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaInternetExplorer } from "react-icons/fa6";

export default function AppSidebar({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (section: string) => void;
}) {
  const menuItems = [
    {
      title: "Manage Blogs",
      icon: FileText,
      id: "blogs",
    },
    {
      title: "Add to Site",
      icon: Plus,
      id: "add",
    },
  ];

  const linkItems = [
    {
      id: 1,
      title: "Explore Blogs",
      href: "/",
      icon: MdOutlineTravelExplore,
    },
    {
      id: 2,
      title: "Write Blog",
      href: "/write",
      icon: Pen,
    },
  ];

  const { user, loading, setUser } = useAuth();

  const router = useRouter();

  const handleClick = (id: string) => {
    setActiveSection(id);
    if (id === "blogs") router.push("/dashboard/myBlogs");
    if (id === "add") router.push("/dashboard/addToSite");
  };

  return (
    <Sidebar className="border-r border-muted">
      <SidebarHeader>
        <div className="flex items-center gap-3 py-4">
          <Link href={"/explore"} className="cursor-pointer">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-12 h-12 border border-muted rounded-md object-contain"
            />
          </Link>
          <div>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your blogs.</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  className={`${
                    activeSection === item.id
                      ? "bg-accent text-accent-foreground"
                      : ""
                  }`}
                  onClick={() => handleClick(item.id)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Explore All</SidebarGroupLabel>
          <SidebarMenu>
            {linkItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <Link href={item.href}>
                  <SidebarMenuButton className="flex  gap-2 w-full">
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-muted items-start">
        <div className="flex items-center gap-3">
          {loading ? (
            <Skeleton className="h-9 w-9 rounded-sm" />
          ) : (
            <Avatar className="h-9 w-9 rounded-sm">
              <AvatarImage src={user?.pfp} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          <div className="flex flex-col">
            <h2 className="text-sm font-medium leading-none">{user?.name}</h2>
            <p className="text-xs text-muted-foreground truncate max-w-[150px]">
              {user?.email}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
