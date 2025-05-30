"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const url = process.env.NEXT_PUBLIC_SERVER_URL;

export const googleHandler = () => {
  const router = useRouter();
  try {
    router.push(`${url}/auth/google`);
  } catch (error) {
    toast.error("Google auth error!");
  }
};
