import Link from "next/link";
import EventAddSection from "../_components/event-add-section";
import { ExternalLink } from "@ui/components/ui/icon";

export default function Page() {
  return (
    <main className="flex h-full flex-col grow gap-5 pl-16 pr-20 pt-20">
      <div className="flex items-center">
        <h1 className="text-[34px] font-bold">행사 정보 등록</h1>
        <Link
          href={"https://lava-jaborosa-132.notion.site/21ad687f7bb680ecaa7df9e638976b17"}
          target="_blank"
          className="flex items-center ml-5 text-sm font-bold px-3 py-1 rounded bg-[#F0EDFD] text-brand hover:bg-[#F0EDFD]"
        >행사 등록 가이드
        <ExternalLink size={16} className="ml-1"/>
        </Link>
      </div>
      <EventAddSection />
    </main>
  );
}
