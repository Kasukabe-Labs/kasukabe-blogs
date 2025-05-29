import BlogPage from "@/app/explore/[slug]/page";
import React from "react";

export default function page() {
  return (
    <div>
      <span className="mt-8 w-full justify-center items-center p-4 flex">
        Made with{" "}
        <a
          className="underline text-blue-600 cursor-pointer ml-1"
          href="https://kasukabeblogs.vercel.app"
          target="_blank"
        >
          Kasukabe blogs
        </a>
      </span>
      <BlogPage />
    </div>
  );
}
