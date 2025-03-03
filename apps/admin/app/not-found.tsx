import { Button } from "@ui/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-3">
      <header className="space-y-1 text-center">
        <h1 className="text-xl font-bold">페이지를 찾을 수 없어요.</h1>
        <p className="text-desc text-xs">요청하신 URL은 등록되지 않았어요.</p>
      </header>
      <Button asChild variant="ghost">
        <Link href={"/"} className="underline underline-offset-4">
          홈 화면으로
        </Link>
      </Button>
    </main>
  );
}
