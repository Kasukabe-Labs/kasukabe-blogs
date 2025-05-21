"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "./MenuBar";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";

const Tiptap = () => {
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
          class: "max-w-full h-auto",
        },
      }),
    ],
    immediatelyRender: false,
    content: savedContent,
    onUpdate: ({ editor }) => {
      const jsonContent = editor.getJSON();
      localStorage.setItem("content", JSON.stringify(jsonContent));
    },
    editorProps: {
      attributes: {
        class:
          "min-h-400px border rounded-sm p-4 max-w-5xl mx-auto p-5 mt-4 h-[800px] overflow-y-auto",
      },
    },
  });

  return (
    <div className="py-10 px-2">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
