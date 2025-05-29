import { Button } from "@ui/components/ui/button";
import { Skeleton } from "@ui/components/ui/skeleton";
import { HydrationBoundary } from "@uket/api";
import { prefetchAdminEventInfoList } from "@uket/api/queries/admin-event-info";
import Link from "next/link";
import { Suspense } from "react";
import NonAvailableSection from "../../../components/non-available-section";
import { checkUserAgent } from "../../../utils/check-user-agent";
import EventTableSection from "./_components/event-table-section";

const LoadingFallback = () => (
  <div className="flex h-full flex-col gap-3">
    <Skeleton className="w-full h-[800px]" />
  </div>
);

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const isMobileDevice = await checkUserAgent();

  if (isMobileDevice) {
    return <NonAvailableSection title="내 행사 관리" />;
  }

  const pageParam = (await searchParams).page;
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  const state = prefetchAdminEventInfoList(currentPage);

  return (
    <HydrationBoundary state={state}>
      <main className="flex h-full flex-col grow gap-5 pl-16 pr-20 pt-20">
        <header className="flex items-end justify-between">
          <h1 className="text-[34px] font-bold">내 행사 관리</h1>
          <Button
            asChild
            className="font-bold bg-brand hover:bg-brandHover w-44"
          >
            <Link href="/event-manage/add">행사 추가</Link>
          </Button>
        </header>

        <Suspense fallback={<LoadingFallback />}>
          <EventTableSection />
        </Suspense>
      </main>
    </HydrationBoundary>
  );
}
