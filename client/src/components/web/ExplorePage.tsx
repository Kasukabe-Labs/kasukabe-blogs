"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BlogCard from "./blog/card";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  author: string;
  publishedAt: string;
}

const bgColors = [
  "bg-gradient-to-r from-amber-200 to-yellow-400",
  "bg-gradient-to-r from-blue-200 to-blue-400",
  "bg-gradient-to-r from-green-200 to-green-400",
  "bg-gradient-to-r from-purple-200 to-purple-400",
];

export default function ExplorePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/allBlogs`;

  const fetchBlogs = async () => {
    setLoading(true);
    const query = cursor ? `?limit=4&cursor=${cursor}` : `?limit=3`;
    const res = await fetch(`${URL}${query}`);
    const data = await res.json();
    setBlogs((prev) => [...prev, ...data.blogs]);
    setCursor(data.nextCursor);
    setHasNext(Boolean(data.nextCursor));
    setLoading(false);
  };

  const nextCursorHandler = () => {
    if (hasNext && !loading) {
      fetchBlogs();
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="w-full justify-center items-center flex flex-col">
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
      <Button
        variant="secondary"
        className="my-4"
        onClick={nextCursorHandler}
        disabled={!hasNext || loading}
      >
        {loading ? "Loading..." : hasNext ? "Load more" : "No more blogs"}
      </Button>
    </div>
  );
}
