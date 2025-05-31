// app/explore/layout.tsx

import type { ReactNode } from "react";

export default function ExploreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div className="w-full max-w-5xl px-8 mt-20 sm:mt-24 space-y-2 mx-auto">
        <h1 className="bigText">Blogs</h1>
        <p className="text-lg text-muted-foreground font-mono">
          Explore a wide range of blogs. All in one place.
        </p>
      </div>
      {children}
    </div>
  );
}
