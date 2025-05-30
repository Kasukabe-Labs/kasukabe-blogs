"use client";

import { fetchUserBlogs } from "@/helpers/fetchUserBlogs";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Blog } from "@/types/blogs";
import BlogCard from "@/components/web/blog/card";
import { bgColors } from "@/components/web/ExplorePage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  const [blogs, setBlogs] = useState<Blog[] | null>(null);

  useEffect(() => {
    const getBlogs = async () => {
      const res = await fetchUserBlogs();
      if (res && res.blogs) {
        setBlogs(res.blogs);
      }
    };

    getBlogs();
  }, []);

  return (
    <div className="w-full justify-center items-center flex flex-col h-screen">
      <h1 className="heading">My Blogs</h1>
      {!blogs && (
        <div className="flex flex-col items-center justify-center mt-6 p-4 border border-muted rounded-md space-y-4">
          <p className="text-md tracking-tighter">
            You don't have any blogs right now
          </p>
          <Link href={"/write"}>
            <Button className="cursor-pointer">Start writing</Button>
          </Link>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 w-full max-w-5xl px-4">
        {blogs?.map((blog, index) => (
          <motion.div
            key={blog._id}
            initial={{ filter: "blur(10px)", opacity: 0, y: 12 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <BlogCard
              title={blog.title}
              slug={blog.slug}
              publishedAt={blog.publishedAt}
              author={blog.author}
              bgColor={bgColors[index % bgColors.length]}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
