import { ExternalLink } from "@ui/components/ui/icon";
import Link from "next/link";

export default function HelpReport() {
  const openChatUrl = process.env.NEXT_PUBLIC_OPEN_CHATTING ?? "/";
  return (
    <main className="flex w-full flex-col gap-2 bg-white px-6 py-4">
      <div className="flex h-8 items-center justify-start gap-3">
        <h1 className="text-lg font-bold text-[#17171B]">문의﹒제보하기</h1>
        <Link href={openChatUrl} target="_blank">
          <ExternalLink className="h-5" />
        </Link>
      </div>
    </main>
  );
}
