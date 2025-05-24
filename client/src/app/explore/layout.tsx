import type { ReactNode } from "react";

export default function ExploreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div className="w-full max-w-5xl px-4 mt-32 space-y-2 ml-7">
        <h1 className="bigText">Blogs</h1>
        <p className="text-lg text-muted-foreground font-mono">
          Explore a wide range of blogs. All in one place.
        </p>
      </div>
      {children}
    </div>
  );
}
