"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      toast.success("Login successful");
      router.push("/write");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  const googleHandler = () => {
    try {
      router.push(`${url}/auth/google`);
    } catch (error) {
      toast.error("Google auth error!");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center flex-col">
      <div className="w-full max-w-xs text-left">
        <h1 className="heading">Login</h1>
        <p className="tracking-tight text-gray-500">
          Get started with your credentials
        </p>
        <Button className="w-full cursor-pointer mt-4" onClick={googleHandler}>
          Enter with Google <FaGoogle />
        </Button>
        <Separator className="mt-6" />
      </div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col space-y-2 w-full max-w-sm p-4 text-left"
      >
        <div className="mt-6 space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <Button type="submit" className="cursor-pointer mt-4">
          Login
        </Button>
        <p className="text-sm text-center text-gray-500 mt-2">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 underline">
            Signup here
          </Link>
        </p>
      </form>
    </div>
  );
}
