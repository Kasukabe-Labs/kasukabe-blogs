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
import { Placeholder } from "@tiptap/extension-placeholder";
import PublishSection from "./PublishSection";
import { useAuth } from "@/hooks/useAuth";
import { AlertDialogDemo } from "../auth/AlertDialogDemo";

const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/create`;

const Tiptap = () => {
  const { user } = useAuth();

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
  const [showAlert, setShowAlert] = useState(false);
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
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Start writing here...";
          }
          return "Can you add some further context?";
        },
        includeChildren: true,
      }),
    ],
    immediatelyRender: false,
    content: savedContent || "<h1></h1>",
    onUpdate: ({ editor }) => {
      const jsonContent = editor.getJSON();
      let headingText = "";

      for (const block of jsonContent.content || []) {
        if (block.type === "heading" && block.content) {
          headingText = block.content.map((c) => c.text).join("");
          break;
        }
      }

      setTitle(headingText);

      localStorage.setItem("content", JSON.stringify(jsonContent));
    },
    editorProps: {
      attributes: {
        class:
          "prose max-w-5xl h-screen outline-none focus:outline-none focus:ring-0 border-none focus:border-none",
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
    if (!user) {
      setShowModal(false);
      setShowAlert(true);
      return;
    }
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

      {showAlert && (
        <AlertDialogDemo open={showAlert} onOpenChange={setShowAlert} />
      )}
      <MenuBar editor={editor} />

      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
