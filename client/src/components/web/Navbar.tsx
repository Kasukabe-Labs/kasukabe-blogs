"use client";

import React from "react";
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
    <nav className="w-full border-b px-2 py-2 flex flex-wrap justify-between items-center gap-4 sm:gap-6 md:h-16 z-20 bg-background">
      <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
        <Link href="/explore">
          <Button size="sm" variant="link">
            Explore
          </Button>
        </Link>
        <Link href="/write">
          <Button size="sm" variant="link">
            Write
          </Button>
        </Link>
        {user && (
          <Link href="/dashboard">
            <Button size="sm" variant="link">
              Dashboard
            </Button>
          </Link>
        )}
      </div>

      <div className="flex gap-2 sm:gap-4 items-center">
        {loading ? (
          <Skeleton className="h-10 w-10 rounded-full" />
        ) : (
          <Avatar>
            <AvatarImage src={user?.pfp} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        )}

        {user ? (
          <Button size="sm" variant="destructive" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        ) : (
          <Link href="/signup">
            <Button disabled={loading} size="sm" variant="outline">
              {loading ? "Loading..." : "Signup"}
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
