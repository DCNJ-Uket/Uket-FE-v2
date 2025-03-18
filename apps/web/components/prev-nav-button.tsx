"use client";

import { Button } from "@ui/components/ui/button";
import { ChevronLeftIcon } from "@ui/components/ui/icon";
import { useRouter } from "next/navigation";

export default function PrevNavButton() {
  const router = useRouter();

  return (
    <header className="left-0 top-0 z-10 w-full bg-white py-2 px-2">
      <nav className="h-10 flex w-full items-center justify-between self-stretch">
        <Button size="icon" variant="ghost" onClick={router.back} className="hover:bg-zinc-100">
          <ChevronLeftIcon />
        </Button>
      </nav>
    </header>
  );
}
