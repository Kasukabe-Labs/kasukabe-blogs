"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "./MenuBar";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { predefinedTags } from "@/helpers/tags";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Send, FileEdit, Tag, Plus, X } from "lucide-react";
import PublishSection from "./PublishSection";

const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/create`;

const Tiptap = () => {
  const CustomHighlight = Highlight.extend({
    addKeyboardShortcuts() {
      return {
        Enter: () => {
          this.editor.commands.unsetHighlight();
          return false;
        },
      };
    },
  });

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [customTag, setCustomTag] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const savedContent =
    typeof window !== "undefined" && localStorage.getItem("content")
      ? JSON.parse(localStorage.getItem("content") || "")
      : "";

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
      CustomHighlight.configure({
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
    immediatelyRender: false,
    content: savedContent,
    onUpdate: ({ editor }) => {
      const jsonContent = editor.getJSON();
      const headingNode = jsonContent.content?.find(
        (node) => node.type === "heading" && node.attrs?.level === 2
      );
      const extractedTitle =
        headingNode?.content?.map((part) => part.text).join("") ?? "";

      setTitle(extractedTitle);
      localStorage.setItem("content", JSON.stringify(jsonContent));
    },
    editorProps: {
      attributes: {
        class:
          "min-h-96 border rounded-md p-4 max-w-5xl mx-auto focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-transparent prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto",
      },
    },
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const addCustomTag = () => {
    if (customTag.trim()) {
      const newTags = customTag
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag && !selectedTags.includes(tag));

      setSelectedTags((prev) => [...prev, ...newTags]);
      setCustomTag("");
    }
  };

  const handlePublish = async () => {
    const content = localStorage.getItem("content");

    if (!content || !title.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    const tags = selectedTags.map((tag) => ({ name: tag.trim() }));

    try {
      const res = await axios.post(
        URL,
        {
          title: title.trim(),
          content: JSON.parse(content),
          tags,
          isPublished: true,
        },
        { withCredentials: true }
      );

      toast.success("Blog published successfully! 🎉");
      setShowModal(false);
      setTitle("");
      setSelectedTags([]);
      setCustomTag("");
    } catch (err) {
      console.error("Failed to publish blog:", err);
      toast.error("Error publishing blog. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-4 -mb-32 space-y-4">
      <MenuBar editor={editor} />

      <EditorContent editor={editor} />

      {/* Publish Section */}
      <PublishSection
        addCustomTag={addCustomTag}
        customTag={customTag}
        handlePublish={handlePublish}
        predefinedTags={predefinedTags}
        removeTag={removeTag}
        selectedTags={selectedTags}
        setCustomTag={setCustomTag}
        setShowModal={setShowModal}
        setTitle={setTitle}
        showModal={showModal}
        title={title}
        toggleTag={toggleTag}
      />
    </div>
  );
};

export default Tiptap;
