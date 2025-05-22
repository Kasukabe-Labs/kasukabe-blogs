import { Toggle } from "@/components/ui/toggle";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Highlighter,
  Image,
  Italic,
  List,
  ListOrdered,
  Quote,
  SeparatorHorizontal,
  Strikethrough,
  Text,
  Undo,
} from "lucide-react";
import React from "react";
import { Editor } from "@tiptap/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  const highlightColors = [
    { name: "Yellow", color: "#fef08a" },
    { name: "Green", color: "#bbf7d0" },
    { name: "Pink", color: "#fbcfe8" },
    { name: "Blue", color: "#bfdbfe" },
    { name: "Orange", color: "#fed7aa" },
  ];

  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
      title: "Heading 1",
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
      title: "Heading 2",
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
      title: "Heading 3",
    },
    {
      icon: <Heading4 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      pressed: editor.isActive("heading", { level: 4 }),
      title: "Heading 4",
    },
    {
      icon: <Heading5 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      pressed: editor.isActive("heading", { level: 5 }),
      title: "Heading 5",
    },
    {
      icon: <Text className="size-4" />,
      onClick: () => editor.chain().focus().setParagraph().run(),
      pressed: editor.isActive("paragraph"),
      title: "Text",
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
      title: "Bold",
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
      title: "Italic",
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
      title: "Strikethrough",
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().setCodeBlock().run(),
      pressed: editor.isActive("codeBlock"),
      title: "Code Block",
    },
    {
      icon: <Quote className="size-4" />,
      onClick: () => editor.chain().focus().setBlockquote().run(),
      pressed: editor.isActive("blockquote"),
      title: "Quote",
    },
    {
      icon: <Undo className="size-4" />,
      onClick: () => editor.chain().focus().undo().run(),
      pressed: editor.isActive("undo"),
      title: "Undo",
    },
    {
      icon: <Undo className="size-4 rotate-180" />,
      onClick: () => editor.chain().focus().redo().run(),
      pressed: editor.isActive("redo"),
      title: "Redo",
    },
    {
      icon: (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`size-4 ${
                editor.isActive("image") ? "bg-zinc-200" : ""
              }`}
            >
              <Image className="size-4 text-black" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                className="w-full border border-zinc-300 rounded-md px-2 py-1 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const target = e.target as HTMLInputElement;
                    if (target.value) {
                      editor
                        ?.chain()
                        .focus()
                        .setImage({ src: target.value })
                        .run();
                      target.value = "";
                    }
                  }
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Upload from Device
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (typeof reader.result === "string") {
                        editor
                          ?.chain()
                          .focus()
                          .setImage({ src: reader.result })
                          .run();
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
      ),
      onClick: () => {},
      pressed: editor.isActive("image"),
      title: "Image",
    },
    {
      icon: <SeparatorHorizontal className="size-4" />,
      onClick: () => editor.chain().focus().setHardBreak().run(),
      pressed: editor.isActive("hardBreak"),
      title: "Hard Break",
    },
    {
      icon: (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`size-4 ${editor.isActive("highlight")}`}
            >
              <Highlighter className="size-4 text-black" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2 grid grid-cols-5 gap-2">
            {highlightColors.map(({ color, name }) => (
              <button
                key={name}
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: color }}
                onClick={() =>
                  editor.chain().focus().setHighlight({ color }).run()
                }
              />
            ))}
          </PopoverContent>
        </Popover>
      ),
      onClick: () => {},
      pressed: editor.isActive("highlight"),
      title: "Highlight",
    },

    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
      title: "Bullet List",
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
      title: "Ordered List",
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
      title: "Align Left",
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
      title: "Align Center",
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
      title: "Align Right",
    },
    {
      icon: <AlignJustify className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      pressed: editor.isActive({ textAlign: "justify" }),
      title: "Align Justify",
    },
  ];

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-wrap gap-3 items-center justify-center border border-zinc-300 rounded-xl bg-zinc-50 p-2 w-[70%]">
        {Options.map((option, index) => (
          <Toggle
            key={index}
            pressed={option.pressed}
            onPressedChange={option.onClick}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>{option.icon}</TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{option.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Toggle>
        ))}
      </div>
    </div>
  );
}
