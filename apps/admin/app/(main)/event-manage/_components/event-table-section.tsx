/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@ui/components/ui/badge";
import { cn } from "@ui/lib/utils";
import { useQueryAdminEventInfoList } from "@uket/api/queries/admin-event-info";
import { Content } from "@uket/api/types/admin-event";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import StatusSelector from "../../../../components/status-selector";
import { useEventManageParams } from "../../../../hooks/use-event-manage-params";
import EventTypeFilter, { EventType } from "./event-type-filter";
import EventTable from "./event-table";

export type Entry = Content;

export const columns = (
  pageIndex: number,
  selectedEventType: EventType,
  isSuperAdmin: boolean,
  setSelectedEventType: (value: EventType) => void,
): ColumnDef<Entry>[] => [
  {
    id: "rowNumber",
    header: "번호",
    cell: ({ row }) => {
      return (pageIndex - 1) * 10 + row.index + 1;
    },
  },
  {
    accessorKey: "eventName",
    header: "행사명",
  },
  {
    accessorKey: "organizationName",
    header: "주최명",
  },
  {
    accessorKey: "eventType",
    header: () => (
      <div className="flex justify-center">
        <EventTypeFilter
          value={selectedEventType}
          onSelect={setSelectedEventType}
        />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="rounded-lg border border-[#8989A1] px-1 py-px">
          {row.original.eventType === "FESTIVAL" ? "축제" : "공연"}
        </div>
      );
    },
  },
  {
    accessorKey: "eventDate",
    header: "행사 날짜",
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {row.original.eventStartDate} ~ {row.original.eventEndDate}
        </div>
      );
    },
  },
  {
    accessorKey: "ticketingStartDateTime",
    header: "티켓 오픈 날짜",
  },
  {
    accessorKey: "registrationStatus",
    header: "행사 등록 상태",
    cell: ({ row }) => {
      const uketEventRegistrationId = row.original.uketEventRegistrationId;
      const registationStatus = row.original.registrationStatus;
      const eventName = row.original.eventName;

      return (
        <div className="flex justify-center">
          <StatusSelector
            isTicket={false}
            key={uketEventRegistrationId}
            id={uketEventRegistrationId}
            status={registationStatus}
            name={eventName}
            page={pageIndex}
            changeable={isSuperAdmin}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "eventInfo",
    header: () => <div>행사 정보</div>,
    cell: ({ row }) => {
      const eventId = row.original.uketEventRegistrationId;
      const isEditable = row.original.isModifiable;
      const router = useRouter();

      const style = isEditable
        ? "bg-[#F0EDFD] text-brand hover:bg-[#F0EDFD]"
        : "bg-[#F2F2F2] text-[#CCCCCC] cursor-not-allowed";

      const content = isEditable ? "수정하기" : "수정 불가";

      return (
        <Badge
          className={cn(
            "h-8 w-28 justify-center rounded-lg text-base cursor-pointer font-medium",
            style,
          )}
          onClick={() => {
            if (!isEditable) return;
            router.push(`/event-manage/modify/${eventId}`);
          }}
        >
          {content}
        </Badge>
      );
    },
  },
];

export default function EventTableSection({
  isSuperAdmin = false,
}: {
  isSuperAdmin?: boolean;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { page, eventType, updateQuery } = useEventManageParams();

  const { data: events } = useQueryAdminEventInfoList({
    page,
  });

  const itemsPerPage = 10;

  const filteredEvents = useMemo(() => {
    if (!events) {
      router.push(`/event-manage/add`);
    }

    if (eventType === "ALL") return events.timezoneData;
    return events.timezoneData.filter(entry => entry.eventType === eventType);
  }, [events, eventType, router]);

  const pageCount = useMemo(() => {
    return Math.ceil(filteredEvents.length / itemsPerPage);
  }, [filteredEvents]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <section className="flex flex-col gap-3">
      <EventTable
        columns={columns(page, eventType, isSuperAdmin, newType =>
          updateQuery({ eventType: newType }),
        )}
        data={filteredEvents}
        pageIndex={page}
        setPageIndex={handlePageChange}
        pageCount={pageCount || 1}
      />
    </section>
  );
}
