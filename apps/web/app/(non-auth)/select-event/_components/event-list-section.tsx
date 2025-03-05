"use client";

import { Button } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";
import { Suspense } from "react";
import EventListErrorFallback from "../../../../components/error-fallback/event-list-error-fallback";
import RetryApiErrorBoundary from "../../../../components/retry-api-error-boundary";
import { useSelectEvent } from "../../../../hooks/use-select-event";
import EventList from "./event-list";

export default function EventListSection() {
  const { selectedEventId, handleSelectEvent, handleNavigate } =
    useSelectEvent();

  return (
    <section className="grow flex flex-col">
      <RetryApiErrorBoundary fallback={<EventListErrorFallback />}>
        <Suspense fallback={<div>Loading...</div>}>
          <EventList
            selectedEventId={selectedEventId}
            onSelect={handleSelectEvent}
          />
        </Suspense>
      </RetryApiErrorBoundary>
      <footer className="container sticky bottom-5 flex w-full flex-col items-center justify-center">
        <Button
          className={cn(
            "bg-formInput text-buttonDisabled hover:bg-formInput w-full rounded-xl p-6 text-base font-black",
            selectedEventId && "bg-brand hover:bg-brand/80 text-white",
          )}
          onClick={handleNavigate}
        >
          다음으로
        </Button>
      </footer>
    </section>
  );
}
