"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

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
    <div className="flex justify-center items-center w-full h-16 absolute top-6 z-10">
      <div className="md:w-[30%] p-4 gap-4 bg-zinc-100 rounded-xl flex justify-center items-center">
        <Button size={"sm"} variant={"outline"}>
          Explore
        </Button>
        <Link href={"/write"}>
          <Button size={"sm"} variant={"outline"}>
            Write
          </Button>
        </Link>

        {user ? (
          <Button size="sm" variant="destructive" onClick={handleLogout}>
            Logout
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
