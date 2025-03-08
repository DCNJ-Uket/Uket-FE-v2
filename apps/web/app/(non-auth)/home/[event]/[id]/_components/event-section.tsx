/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable no-empty-pattern */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import AuthRequiredModalButton from "../../../../../../components/auth-requried-modal-button";
import EventDetail from "./event-detail";

interface EventSectionProps {}

export default function EventSection({}: EventSectionProps) {
  const router = useRouter();
  const { event, id } = useParams();
  const [eventId, setEventId] = useState<number>(-1);

  const handleNavigateToTicketBuyRoute = () => {
    if (eventId === -1) {
      return;
    }
    router.push(`/buy-ticket?eventName=${event}&hostId=${id}&eventId=${eventId}`);
  };

  const handleInitEventId = (id: number) => {
    setEventId(id);
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      <section className="mb-5 grow space-y-5">
        <EventDetail eventId={id as string} onMount={handleInitEventId} />
      </section>
      <footer className="sticky bottom-5 z-10 mb-3 flex w-full items-center justify-center gap-3">
        <AuthRequiredModalButton
          title="내 티켓 확인"
          path="/ticket-list"
          variant="brandsub"
        />
        <AuthRequiredModalButton
          title="예매하기"
          variant="brand"
          onClick={handleNavigateToTicketBuyRoute}
        />
      </footer>
    </div>
  );
}
