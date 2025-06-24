import { HydrationBoundary } from "@uket/api";
import { prefetchAdminEventInfoDetail } from "@uket/api/queries/admin-event-info";
import { Suspense } from "react";
import EventAddSection from "../../_components/event-add-section";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const state = prefetchAdminEventInfoDetail(id);

  return (
    <HydrationBoundary state={state}>
      <main className="flex h-dvh flex-col grow gap-5 pl-16 pr-20 pt-20">
        <div className="flex items-end justify-between">
          <h1 className="text-[34px] font-bold">행사 정보 수정</h1>
        </div>
        <Suspense>
          <EventAddSection eventId={id} />
        </Suspense>
      </main>
    </HydrationBoundary>
  );
}
