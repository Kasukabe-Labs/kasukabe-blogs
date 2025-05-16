import { Toggle } from "@/components/ui/toggle";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Text,
} from "lucide-react";
import React from "react";
import { Editor } from "@tiptap/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

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
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Heading4 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      pressed: editor.isActive("heading", { level: 4 }),
    },
    {
      icon: <Heading5 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      pressed: editor.isActive("heading", { level: 5 }),
    },
    {
      icon: <Text className="size-4" />,
      onClick: () => editor.chain().focus().setParagraph().run(),
      pressed: editor.isActive("paragraph"),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
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
    },

    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <AlignJustify className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      pressed: editor.isActive({ textAlign: "justify" }),
    },
  ];

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex gap-3 items-center justify-center border border-zinc-300 rounded-xl bg-zinc-50 p-2">
        {Options.map((option, index) => (
          <Toggle
            key={index}
            pressed={option.pressed}
            onPressedChange={option.onClick}
          >
            {option.icon}
          </Toggle>
        ))}
      </div>
    </div>
  );
}
