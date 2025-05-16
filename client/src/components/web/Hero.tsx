import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
      <h1 className="text-4xl font-bold tracking-tighter -mt-24">
        Welcome to Kasukabe Blogs
      </h1>
      <p className="text-lg mt-4">
        A minimalistic blog cms platform made for nerds...
      </p>
      <Image
        src="/hero-1.gif"
        alt="hero-1"
        height={400}
        width={400}
        className="rounded-lg mt-4"
      />
    </div>
  );
}
