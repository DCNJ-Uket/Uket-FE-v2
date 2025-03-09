import { AspectRatio } from "@ui/components/ui/aspect-ratio";
import { Skeleton } from "@ui/components/ui/skeleton";
import { HydrationBoundary } from "@uket/api";
import { prefetchUserTicketList } from "@uket/api/queries/user";
import { Suspense } from "react";
import RetryApiErrorBoundary from "../../../components/retry-api-error-boundary";
import TicketListSection from "./_components/ticket-list-section";

export const dynamic = "force-dynamic";

const LoadingFallback: React.FC = () => {
  return (
    <main className="flex flex-row items-center gap-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <section key={index} className="flex flex-col divide-y p-0">
          <div className="flex h-96 w-72 flex-col rounded-xl rounded-b-3xl rounded-t-xl bg-white">
            <AspectRatio ratio={16 / 9}>
              <Skeleton className="h-full w-full rounded-b-none bg-gray-200" />
            </AspectRatio>
            <main className="container flex grow flex-col justify-evenly">
              <div className="space-y-3">
                <Skeleton className="h-4 w-12" />
                <div className="flex gap-3">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
              <div className="grid auto-rows-auto grid-cols-2 gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </main>
          </div>
          <div className="container flex justify-between rounded-b-xl rounded-t-3xl bg-white py-5">
            <div className="flex flex-col items-start justify-evenly gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </section>
      ))}
    </main>
  );
};

export default function Page() {
  const state = prefetchUserTicketList();

  return (
    <HydrationBoundary state={state}>
      <main className="w-full h-full relative flex flex-col items-center justify-evenly bg-[#F2F2F2]">
        <main className="mb-10 mt-6 flex h-full w-full flex-col gap-4">
          <header className="container flex items-center justify-between text-xl font-bold">
            <p>내 티켓</p>
            <p className="text-brand border-brand bg-brand/10 w-fit rounded-md border-[0.5px] px-2 py-1 text-xs">
              티켓을 터치하여 QR 제시
            </p>
          </header>
          <section className="flex w-full justify-center py-10 lg:container">
            <RetryApiErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <TicketListSection />
              </Suspense>
            </RetryApiErrorBoundary>
          </section>
        </main>
      </main>
    </HydrationBoundary>
  );
}
