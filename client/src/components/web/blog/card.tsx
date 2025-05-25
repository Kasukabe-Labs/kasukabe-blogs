import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface BlogCardProps {
  title: string;
  slug: string;
  publishedAt: string;
  author: string;
  bgColor: string;
}

export default function BlogCard({
  title,
  slug,
  publishedAt,
  author,
  bgColor,
}: BlogCardProps) {
  const date = new Date(publishedAt);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div className="w-full  p-4">
      <Link href={`/explore/${slug}`} className="cursor-pointer">
        <div className="h-full flex flex-col">
          <div className={cn(bgColor, "w-72 h-72 rounded-sm mb-4")}></div>

          {/* Title */}
          <h2 className="text-lg font-normal tracking-tight max-w-72">
            {title}
          </h2>

          {/* Date */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {formattedDate}
          </p>
        </div>
      </Link>
    </div>
  );
}
