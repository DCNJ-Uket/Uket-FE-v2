/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable no-console */
"use client";

import { Skeleton } from "@ui/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import EventListErrorFallback from "../../../../components/error-fallback/event-list-error-fallback";
import RetryApiErrorBoundary from "../../../../components/retry-api-error-boundary";
import { useEventTypeParams } from "../../../../hooks/use-event-type-params";
import UketEventList from "./uket-event-list";
import UketEventTypeSelector from "./uket-event-type-selector";

const EventListFallback = () => {
  return (
    <main className="grid grow auto-rows-min grid-cols-2 gap-5 justify-items-center">
      {[...Array(9)].map((_, index) => (
        <div
          key={index}
          className="flex h-52 w-full flex-col items-center justify-center gap-3"
        >
          <Skeleton className="rounded-2xl bg-white p-3 h-40 w-full" />
          <Skeleton className="h-4 w-1/4 bg-white" />
          <Skeleton className="h-4 w-1/2 bg-white" />
        </div>
      ))}
    </main>
  );
};

export default function EventListSection() {
  const router = useRouter();
  const { eventType } = useEventTypeParams();

  const vercel = process.env.VERCEL_ENV;
  const isPreview = process.env.VERCEL_ENV === "preview";
  const url =
    vercel === "production"
      ? "https://api.uket.co.kr"
      : "https://dev.api.uket.co.kr";
  console.log(vercel, url, isPreview);

  const handleSelectEvent = (eventName: string, eventId: number) => {
    router.push(`/home/${eventName}/${eventId}`);
  };

  return (
    <section className="grow flex flex-col gap-5">
      <UketEventTypeSelector />
      <RetryApiErrorBoundary fallback={<EventListErrorFallback />}>
        <Suspense fallback={<EventListFallback />}>
          <UketEventList onSelect={handleSelectEvent} eventType={eventType} />
        </Suspense>
      </RetryApiErrorBoundary>
    </section>
  );
}
