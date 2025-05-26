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
import { FileText, Plus, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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

  const { user, loading, setUser } = useAuth();

  return (
    <Sidebar className="border-r border-muted">
      <SidebarHeader>
        <div className="flex items-center gap-3 py-4">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-12 h-12 border border-muted rounded-md object-contain"
          />
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
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => {
                  // Handle settings click
                }}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
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
