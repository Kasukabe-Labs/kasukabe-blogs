import { Toggle } from "@/components/ui/toggle";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Highlighter,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  SeparatorHorizontal,
  Strikethrough,
  Text,
  Undo,
} from "lucide-react";
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);

  if (!editor) {
    return null;
  }

  const highlightColors = [
    { name: "Deep Yellow", color: "#b59f3b" },
    { name: "Teal", color: "#0f766e" },
    { name: "Plum", color: "#783c96" },
    { name: "Indigo", color: "#4338ca" },
    { name: "Crimson", color: "#b91c1c" },
    { name: "Rust Orange", color: "#b45309" },
    { name: "Forest Green", color: "#166534" },
  ];

  const handleLinkSubmit = () => {
    if (linkUrl) {
      const { from, to } = editor.state.selection;
      const selectedText = editor.state.doc.textBetween(from, to, "");

      if (selectedText) {
        // If text is selected, just add the link
        editor.chain().focus().setLink({ href: linkUrl }).run();
      } else {
        // If no text is selected, insert link with custom text or URL as text
        const displayText = linkText || linkUrl;
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${linkUrl}">${displayText}</a>`)
          .run();
      }

      setLinkUrl("");
      setLinkText("");
      setIsLinkPopoverOpen(false);
    }
  };

  const removeLinkFromSelection = () => {
    editor.chain().focus().unsetLink().run();
  };

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
      icon: <Code2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      pressed: editor.isActive("code"),
      title: "Inline Code",
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      pressed: editor.isActive("codeBlock"),
      title: "Code Block",
    },
    {
      icon: <Quote className="size-4" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      pressed: editor.isActive("blockquote"),
      title: "Quote",
    },
    {
      icon: (
        <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`size-8 h-8 w-8 ${
                editor.isActive("link") ? "bg-zinc-200" : ""
              }`}
            >
              <Link className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="link-url" className="text-sm font-medium">
                URL
              </Label>
              <Input
                id="link-url"
                type="url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLinkSubmit();
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link-text" className="text-sm font-medium">
                Link Text (optional)
              </Label>
              <Input
                id="link-text"
                type="text"
                placeholder="Enter link text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLinkSubmit();
                  }
                }}
              />
              <p className="text-xs text-gray-500">
                Leave empty to use URL as text, or select text first then add
                link
              </p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" onClick={handleLinkSubmit} disabled={!linkUrl}>
                Add Link
              </Button>
              {editor.isActive("link") && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={removeLinkFromSelection}
                >
                  Remove Link
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      ),
      onClick: () => {},
      pressed: editor.isActive("link"),
      title: "Link",
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
              className={`size-8 h-8 w-8 ${
                editor.isActive("highlight") ? "bg-zinc-200" : ""
              }`}
            >
              <Highlighter className="size-4" />
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
      <div className="flex flex-wrap gap-3 items-center justify-center border rounded-md p-2 w-[80%]">
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
