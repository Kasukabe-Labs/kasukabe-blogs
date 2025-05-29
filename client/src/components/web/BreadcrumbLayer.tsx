"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BreadcrumbLayer() {
  const pathname = usePathname();
  console.log("Raw pathname: ", pathname);
  const segments = pathname.split("/").filter(Boolean);
  console.log("Segmented pathname: ", segments);

  if (pathname.includes("explore") || pathname.includes("write")) {
    return null;
  }
  return (
    <div className="w-full px-4 bg-transparent sticky top-2 justify-center items-center z-30 flex">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="max-w-[100px] truncate block">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {segments.map((segment, idx) => {
            const href = "/" + segments.slice(0, idx + 1).join("/");
            const isLast = idx === segments.length - 1;

            return (
              <React.Fragment key={href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <span className="text-muted-foreground capitalize max-w-[150px] truncate block">
                      {segment}
                    </span>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={href}
                        className="capitalize max-w-[150px] truncate block"
                      >
                        {segment}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
