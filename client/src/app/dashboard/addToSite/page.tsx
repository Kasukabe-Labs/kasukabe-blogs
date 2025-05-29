import React from "react";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function page() {
  return (
    <div className="w-full justify-center items-center flex flex-col h-screen">
      <div className="flex flex-col space-y-1 justify-start items-start">
        <h1 className="heading">Coming Soon 🚀</h1>
        <p className="text-md font-normal tracking-tight text-muted-foreground">
          This feature is under development and will be launched very soon.
        </p>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <span className="flex flex-col items-start justify-start gap-1">
            For daily updates follow👇
            <a
              href="https://x.com/Subhraneel55545"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-primary hover:underline transition-colors "
            >
              <FaSquareXTwitter className="h-4 w-4" />
              Subhraneel{" "}
              <span className="hidden sm:inline">
                (Creator of Kasukabe Blogs)
              </span>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
