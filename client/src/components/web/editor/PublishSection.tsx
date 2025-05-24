"use client";
import React, { useState } from "react";
import { Send, Tag, X, Plus } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PublishSectionProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;

  title: string;
  setTitle: (value: string) => void;

  selectedTags: string[];
  predefinedTags: string[];

  customTag: string;
  setCustomTag: (value: string) => void;

  toggleTag: (tag: string) => void;
  addCustomTag: () => void;
  removeTag: (tag: string) => void;

  handlePublish: () => void;
}

export default function PublishSection({
  showModal,
  setShowModal,
  title,
  setTitle,
  selectedTags,
  predefinedTags,
  customTag,
  setCustomTag,
  toggleTag,
  addCustomTag,
  removeTag,
  handlePublish,
}: PublishSectionProps) {
  return (
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
                      <Badge key={tag} variant="secondary" className="gap-1">
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
  );
}
