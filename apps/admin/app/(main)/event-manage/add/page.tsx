import { SquareArrowOutUpRightIcon } from "@ui/components/ui/icon";
import Link from "next/link";
import EventAddSection from "../_components/event-add-section";

export default function Page() {
  return (
    <main className="flex h-full flex-col grow gap-5 pl-16 pr-20 pt-20">
      <div className="flex items-center gap-4">
        <h1 className="text-[34px] font-bold">행사 정보 등록</h1>
        <Link
          href={
            "https://lava-jaborosa-132.notion.site/21ad687f7bb680ecaa7df9e638976b17"
          }
          className="bg-[#ECE8FC] text-brand font-medium text-base px-2.5 py-0.5 rounded-lg flex items-center gap-2"
        >
          행사 등록 가이드
          <SquareArrowOutUpRightIcon size={16} strokeWidth={3} />
        </Link>
      </div>
      <EventAddSection />
    </main>
  );
}
