import Tiptap from "@/components/web/editor/Tiptap";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center flex-col mt-32 md:mt-0">
      <h1 className="heading">Write</h1>
      <p className="tracking-tight text-gray-500">
        Write your thoughts and ideas, nerd!
      </p>
      <Tiptap />
    </div>
  );
}
