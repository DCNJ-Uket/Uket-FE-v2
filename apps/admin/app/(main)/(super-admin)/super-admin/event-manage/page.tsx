import { Skeleton } from "@ui/components/ui/skeleton";
import { HydrationBoundary, Suspense } from "@uket/api";
import { prefetchAdminEventInfoList } from "@uket/api/queries/admin-event-info";
import EventTableSection from "../../../event-manage/_components/event-table-section";

const LoadingFallback = () => (
  <div className="flex h-full flex-col gap-3">
    <Skeleton className="w-full h-[800px]" />
  </div>
);

// TODO: 행사 목록이 없다면, 행사 등록으로 이동한다.

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const pageParam = (await searchParams).page;
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  const state = prefetchAdminEventInfoList(currentPage);

  return (
    <HydrationBoundary state={state}>
      <main className="flex h-full flex-col grow gap-5 pl-16 pr-20 pt-20">
        <header className="flex items-center justify-between">
          <h1 className="text-[34px] font-bold">전체 행사 관리</h1>
        </header>

        <Suspense fallback={<LoadingFallback />}>
          <EventTableSection isSuperAdmin={true} />
        </Suspense>
      </main>
    </HydrationBoundary>
  );
}
