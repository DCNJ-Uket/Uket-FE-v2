"use client";

import { cn } from "@uket/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINK_LIST } from "../constants/link";

export default function Footer() {
  const pathname = usePathname();

  return (
    <div className="flex h-14">
      {NAV_LINK_LIST.map(({ href, title }) => (
        <Link
          href={href}
          key={href}
          className={cn(
            "flex h-full grow items-center justify-center px-4 text-[10px] text-desc border-t-[1.2px] border-[#D9D9D9]",
            pathname === href && "text-brand border-brand font-bold",
          )}
        >
          {title}
        </Link>
      ))}
    </div>
  );
}
