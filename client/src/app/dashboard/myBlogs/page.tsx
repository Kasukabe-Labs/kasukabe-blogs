"use client";

import { fetchUserBlogs } from "@/helpers/fetchUserBlogs";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Blog } from "@/types/blogs";
import BlogCard from "@/components/web/blog/card";
import { bgColors } from "@/components/web/ExplorePage";

export default function page() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 w-full max-w-5xl px-4">
        {blogs.map((blog, index) => (
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
