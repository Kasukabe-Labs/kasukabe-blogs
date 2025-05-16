"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "./MenuBar";
import Highlight from "@tiptap/extension-highlight";

const Tiptap = () => {
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
    ],
    immediatelyRender: false,
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class:
          "min-h-400px border-2 border-zinc-300 bg-zinc-50 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-4xl mx-auto p-5 mt-4 h-96",
      },
    },
  });

  return (
    <div className="py-10 -mt-56">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
