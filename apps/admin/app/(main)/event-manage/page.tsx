/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@ui/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import EventListSection from "./_components/event-list-section";
import { checkUserAgent } from "../../../utils/check-user-agent";
import NonAvailableSection from "../../../components/non-available-section";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {

  const isMobileDevice = await checkUserAgent();

  if (isMobileDevice) {
    return <NonAvailableSection title="내 행사 관리" />;
  }

  // TODO: prefetch로 행사 목록을 불러온다.
  // TODO: 행사 목록이 없다면, 행사 등록으로 이동한다.
  // TODO: 행사 목록이 있다면, 목록을 보여준다.

  return (
    <main className="flex h-full flex-col grow gap-5 pl-16 pr-20 pt-20">
      <div className="flex items-end justify-between">
        <h1 className="text-[34px] font-bold">내 행사 관리</h1>
        <Button asChild className="font-bold bg-brand hover:bg-brandHover w-44">
          <Link href="/event-manage/add">행사 추가</Link>
        </Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <EventListSection />
      </Suspense>
    </main>
  );
}
