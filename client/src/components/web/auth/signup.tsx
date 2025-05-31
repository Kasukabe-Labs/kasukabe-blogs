"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [adminSecret, setAdminSecret] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const [showAdminSecret, setShowAdminSecret] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${url}/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email,
          password,
          role,
          secret: role === "admin" ? adminSecret : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      toast.success(data.message || "Signup successful");
      router.push("/explore");
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  const googleHandler = () => {
    try {
      const response = axios.get(`${url}/auth/google`, {
        withCredentials: true,
      });
    } catch (error) {
      toast.error("Google auth error!");
    }
  };

  return (
    <div className="min-h-screen pt-18 w-full flex items-center justify-center flex-col">
      <div className="w-full max-w-xs text-left">
        <h1 className="heading">Signup</h1>
        <p className="tracking-tight text-gray-500">
          Get started with your credentials
        </p>
        <Button className="w-full cursor-pointer mt-4" onClick={googleHandler}>
          Enter with Google <FaGoogle />
        </Button>
        <Separator className="mt-6" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-2 w-full max-w-sm p-4 text-left -mb-32"
      >
        <div className="mt-6 space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <div className="relative">
            <Input
              type={showCnfPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => setShowCnfPassword((prev) => !prev)}
            >
              {showCnfPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <p className="tracking-tight text-sm text-gray-500">
            Select your preferred role. You need{" "}
            <span className="underline cursor-pointer">Admin secret</span> to
            signup as admin
          </p>

          <RadioGroup value={role} onValueChange={(val) => setRole(val)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="admin" id="admin" />
              <Label htmlFor="admin">Admin</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="user" id="user" />
              <Label htmlFor="user">User</Label>
            </div>
          </RadioGroup>

          {role === "admin" && (
            <div className="relative">
              <Input
                type={showAdminSecret ? "text" : "password"}
                placeholder="Admin Secret"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-500"
                onClick={() => setShowAdminSecret((prev) => !prev)}
              >
                {showAdminSecret ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          )}
        </div>

        <Button type="submit" className="cursor-pointer mt-4">
          Submit
        </Button>

        <p className="text-sm text-center text-gray-500 mt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
