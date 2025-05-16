import React from "react";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <div className="flex justify-center items-center w-full h-16 absolute top-2 z-10">
      <div className="md:w-[30%] p-4 gap-4 bg-zinc-100 rounded-xl flex justify-center items-center">
        <Button size={"sm"} variant={"outline"}>
          Explore
        </Button>
        <Button size={"sm"} variant={"outline"}>
          Write
        </Button>
        <Button size={"sm"} variant={"outline"}>
          Signup
        </Button>
      </div>
    </div>
  );
}
