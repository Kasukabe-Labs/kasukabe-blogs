import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const pathname = usePathname();

  let href = pathname.includes("dashboard/myBlogs")
    ? `/dashboard/myBlogs/${slug}`
    : `/explore/${slug}`;

  return (
    <div className="w-full  p-4 border rounded-md">
      <Link href={href} className="cursor-pointer">
        <div className="h-full flex flex-col">
          <div className={cn(bgColor, "w-72 h-72 rounded-sm mb-4")}></div>

          {/* Title */}
          <h2 className="text-lg font-normal tracking-tight max-w-72 truncate">
            {title}
          </h2>

          {/* Date */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {formattedDate}
          </p>

          {/* maybe later 🙂 */}
          {/* {pathname.includes("dashboard") && (
            <div className="mt-4 flex justify-between items-center border-t pt-4 border-border">
              <Button
                variant="outline"
                className="text-sm px-4 py-2 hover:bg-muted transition"
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                className="text-sm px-4 py-2 hover:opacity-90 transition"
              >
                Delete
              </Button>
            </div>
          )} */}
        </div>
      </Link>
    </div>
  );
}
