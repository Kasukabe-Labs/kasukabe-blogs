import { Button } from "@/components/ui/button";
import { FaSquareXTwitter } from "react-icons/fa6";
import React from "react";
import { Share2Icon } from "lucide-react";

interface ShareProps {
  username: string;
  url: string;
}

export default function Share({ username, url }: ShareProps) {
  const ShareMessage = `A must read on Kasukabe Blogs!\n🔗${url}\nWritten by ${username}\nDrop your thoughts 💭!`;

  const handleShare = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      ShareMessage
    )}`;
    window.open(twitterShareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      className="cursor-pointer ml-4"
      variant={"ghost"}
      onClick={handleShare}
    >
      <Share2Icon size={30} />
    </Button>
  );
}
