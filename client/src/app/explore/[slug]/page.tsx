"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { format } from "date-fns";
import axios from "axios";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import Share from "@/components/web/blog/share";

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

  const pathname = usePathname();
  const currentPageUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL}${pathname}`;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-5",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-5",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-yellow-200",
        },
        multicolor: true,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "max-w-[30%] h-auto",
        },
      }),
    ],
    editable: false,
    content: "",
    editorProps: {
      attributes: {
        class: "prose max-w-none",
      },
    },
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
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-8 space-y-6">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={blog.author.pfp} />
          <AvatarFallback>{blog.author.name}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">{blog.author.name}</h2>
          <p className="text-sm text-gray-500">
            {format(new Date(blog.publishedAt), "PPP")}
          </p>
        </div>
        <Share url={currentPageUrl} username={blog.author.name} />
      </div>

      <EditorContent editor={editor} />

      <div className="mt-10 flex flex-wrap gap-2">
        {blog.tags.map((tag) => (
          <Badge variant={"secondary"}>{tag.name}</Badge>
        ))}
      </div>
    </div>
  );
}
