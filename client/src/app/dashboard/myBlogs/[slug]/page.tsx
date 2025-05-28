"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { format } from "date-fns";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Share from "@/components/web/blog/share";
import MenuBar from "@/components/web/editor/MenuBar";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

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

export default function BlogEditorPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
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
    editable: true,
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none p-4 outline-none focus:outline-none focus-visible:outline-none bg-black/70",
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

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${slug}`,
        {
          content: editor?.getJSON(),
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Blog updated successfully🎉");
    } catch (error) {
      toast.error("Internal error at update.", {
        description: "We will get back to you soon",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${slug}`, {
        withCredentials: true,
      });
      toast.success("Blog deleted successfully🎉");
      router.push("/dashboard/myBlogs");
    } catch (error) {
      toast.error("Internal error at delete.", {
        description: "We will get back to you soon",
      });
    }
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!blog) return <div className="text-center p-10">Blog not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 pb-8 space-y-6">
      <div className="px-4 space-y-2">
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
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <Badge key={tag.slug} variant={"secondary"}>
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex gap-4 px-4 mt-4p">
        <Button
          size={"sm"}
          variant="default"
          className="px-6 py-2 text-sm"
          onClick={handleUpdate}
        >
          Update Blog
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="destructive"
              className="px-6 py-2 text-sm"
            >
              Delete Blog
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                blog post.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleDelete}>
                Yes, delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-start justify-start mt-6 bg-black/70 rounded-lg p-2">
        <MenuBar editor={editor} />
      </div>

      <ScrollArea className="h-[600px] md:h-[840px] prose">
        <EditorContent editor={editor} />
      </ScrollArea>
    </div>
  );
}
