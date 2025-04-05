"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@ui/components/ui/badge";
import { cn } from "@ui/lib/utils";
import { useQueryAdminTicketInfoList } from "@uket/api/queries/admin-ticket-info";
import { Content } from "@uket/api/types/admin-ticket-info";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import EventTypeFilter, { EventType } from "./event-type-filter";
import TicketInfoTable from "./ticket-info-table";
import TicketStatusSelector from "./ticket-status-selector";

export type Entry = Content;

export const columns = (
  pageIndex: number,
  selectedEventType: EventType,
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
    header: "티켓 등록 상태",
    cell: ({ row }) => {
      const uketEventRegistrationId = row.original.uketEventRegistrationId;
      const registationStatus = row.original.registrationStatus;
      const eventName = row.original.eventName;

      return (
        <div className="flex justify-center">
          <TicketStatusSelector
            key={uketEventRegistrationId}
            id={uketEventRegistrationId}
            status={registationStatus}
            eventName={eventName}
            page={pageIndex}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "eventInfo",
    header: () => <div>티켓 정보</div>,
    cell: ({ row }) => {
      const registrationStatus = row.original.registrationStatus;
      const isEditable = ["검수 진행", "검수 완료"].includes(
        registrationStatus,
      );

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
        >
          {content}
        </Badge>
      );
    },
  },
];

export default function TicketTableSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  const [selectedEventType, setSelectedEventType] = useState<EventType>("ALL");

  const { data } = useQueryAdminTicketInfoList({
    page: currentPage,
  });

  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (selectedEventType === "ALL") return data.timezoneData;
    return data.timezoneData.filter(
      entry => entry.eventType === selectedEventType,
    );
  }, [data, selectedEventType]);

  const pageCount = useMemo(() => {
    return Math.ceil(filteredData.length / itemsPerPage);
  }, [filteredData]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <section className="flex flex-col gap-3">
      <TicketInfoTable
        columns={columns(currentPage, selectedEventType, setSelectedEventType)}
        data={filteredData}
        pageIndex={currentPage}
        setPageIndex={handlePageChange}
        pageCount={pageCount || 1}
      />
    </section>
  );
}
