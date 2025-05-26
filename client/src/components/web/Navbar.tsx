"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";

export default function Navbar() {
  const router = useRouter();

  const { user, loading, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (res.ok) {
        setUser(null);
        router.push("/login");
      } else {
        const data = await res.json();
        console.error("Logout failed:", data.message);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="flex justify-between items-center w-full h-16 absolute border-b z-20 px-4">
      <div className="gap-4 flex justify-center items-center">
        <Link href={"/explore"}>
          <Button className="cursor-pointer" size={"sm"} variant={"link"}>
            Explore
          </Button>
        </Link>
        <Link href={"/write"}>
          <Button className="cursor-pointer" size={"sm"} variant={"link"}>
            Write
          </Button>
        </Link>
        <Link href={"/dashboard"}>
          <Button className="cursor-pointer" size={"sm"} variant={"link"}>
            Dashboard
          </Button>
        </Link>
      </div>
      <div className="gap-4 flex justify-center items-center">
        {loading ? (
          <Skeleton className="h-10 w-10 rounded-full" />
        ) : (
          <Avatar>
            <AvatarImage src={user?.pfp} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        )}

        {user ? (
          <Button
            className="cursor-pointer"
            size="sm"
            variant="destructive"
            onClick={handleLogout}
          >
            <LogOut />
          </Button>
        ) : (
          <Link href="/signup">
            <Button disabled={loading} size="sm" variant="outline">
              {loading ? "Loading..." : "Signup"}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
