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

const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/create`;

const Tiptap = () => {
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
          "min-h-96 border rounded-md p-4 max-w-5xl mx-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto",
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
    <div className="min-h-screen  py-8 -mb-32">
      <div className="max-w-6xl mx-auto px-4">
        {/* Editor Card */}
        <Card className="mb-8">
          <CardContent className="p-0">
            <div className="border-b">
              <MenuBar editor={editor} />
            </div>
            <div className="p-6">
              <EditorContent editor={editor} />
            </div>
          </CardContent>
        </Card>

        {/* Publish Section */}
        <div className="flex justify-center">
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Send className="h-4 w-4" />
                Publish Blog
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Publish Your Blog
                </DialogTitle>
                <DialogDescription>
                  Add a title and tags to publish your blog post
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Title Input */}
                <div className="space-y-2">
                  <Label htmlFor="title">Blog Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter an engaging title for your blog"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <Separator />

                {/* Tags Section */}
                <div className="space-y-4 h-56 overflow-y-auto">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <Label>Tags</Label>
                  </div>

                  <div>
                    {/* Selected Tags */}
                    {selectedTags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="gap-1"
                          >
                            {tag}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0 hover:bg-transparent"
                              onClick={() => removeTag(tag)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Predefined Tags */}
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Popular Tags
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {predefinedTags.map((tag) => (
                        <Button
                          key={tag}
                          variant={
                            selectedTags.includes(tag) ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Tags */}
                  <div className="space-y-2 mt-4">
                    <Label className="text-sm text-muted-foreground px-2">
                      Add Custom Tags
                    </Label>
                    <div className="flex gap-2 px-2 pb-2">
                      <Input
                        placeholder="Enter tags separated by commas"
                        value={customTag}
                        onChange={(e) => setCustomTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addCustomTag();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addCustomTag}
                        disabled={!customTag.trim()}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="w-full flex justify-between items-center mt-4">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handlePublish} disabled={!title.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Publish
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Tiptap;
