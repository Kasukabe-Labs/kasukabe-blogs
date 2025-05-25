"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { format } from "date-fns";
import axios from "axios";
import Image from "next/image";

interface Blog {
  title: string;
  content: any;
  slug: string;
  publishedAt: string;
  author: {
    name: string;
    email: string;
    pfp: string;
    _id: string;
  };
  tags: { name: string; slug: string }[];
}

export default function BlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editable: false,
    content: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${slug}`
        );
        setBlog(data.blog);
        editor?.commands.setContent(data.blog.content);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchBlog();
  }, [slug, editor]);

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!blog) return <div className="text-center p-10">Blog not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={blog.author.pfp}
          alt={blog.author.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold">{blog.author.name}</h2>
          <p className="text-sm text-gray-500">
            {format(new Date(blog.publishedAt), "PPP")}
          </p>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>

      <EditorContent editor={editor} className="prose max-w-none" />

      <div className="mt-10 flex flex-wrap gap-2">
        {blog.tags.map((tag) => (
          <span
            key={tag.slug}
            className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm"
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}
