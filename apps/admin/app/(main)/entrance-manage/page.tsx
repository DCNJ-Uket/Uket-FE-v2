import { HydrationBoundary } from "@uket/api";
import { prefetchQueryEntranceList } from "@uket/api/queries/admin-entrance";
import { Skeleton } from "@uket/ui/components/ui/skeleton";
import { Suspense } from "react";
import NonAvailableSection from "../../../components/non-available-section";
import { checkUserAgent } from "../../../utils/check-user-agent";
import EntranceTableSection from "./_components/entrance-table-section";

const LoadingFallback = () => (
  <div className="flex h-full flex-col gap-3">
    <div className="flex justify-end">
      <Skeleton className="w-60 h-6" />
    </div>
    <Skeleton className="w-full h-[800px]" />
    <div className="flex justify-center">
      <Skeleton className="h-6 w-60" />
    </div>
  </div>
);

// TODO: Error Boundary 적용
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const pageParam = (await searchParams).page;
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  const isMobileDevice = await checkUserAgent();

  if (isMobileDevice) {
    return <NonAvailableSection title="실시간 입장 조회" />;
  }

  const state = prefetchQueryEntranceList(currentPage);

  return (
    <HydrationBoundary state={state}>
      <main className="flex h-full flex-col grow gap-5 pl-16 pr-20 pt-20">
        <div className="flex items-end justify-between">
          <h1 className="text-[34px] font-bold">실시간 입장 조회</h1>
        </div>
        <Suspense fallback={<LoadingFallback />}>
          <EntranceTableSection />
        </Suspense>
      </main>
    </HydrationBoundary>
  );
}
