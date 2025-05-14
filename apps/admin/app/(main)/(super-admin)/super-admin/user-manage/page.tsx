import { Skeleton } from "@ui/components/ui/skeleton";
import { HydrationBoundary } from "@uket/api";
import { prefetchAdminUserList } from "@uket/api/queries/admin-user";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import UserTableSection from "./_components/user-table-section";

const LoadingFallback = () => (
  <div className="flex h-full flex-col gap-3">
    <Skeleton className="w-full h-[800px]" />
  </div>
);

const UserAddButton = dynamic(() => import("./_components/user-add-button"));

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const pageParam = (await searchParams).page;
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  const state = prefetchAdminUserList(currentPage);

  return (
    <HydrationBoundary state={state}>
      <main className="flex h-full flex-col grow gap-5 pl-16 pr-20 pt-20">
        <header className="flex items-center justify-between">
          <h1 className="text-[34px] font-bold">사용자 관리</h1>
          <UserAddButton page={currentPage} />
        </header>
        <Suspense fallback={<LoadingFallback />}>
          <UserTableSection />
        </Suspense>
      </main>
    </HydrationBoundary>
  );
}
