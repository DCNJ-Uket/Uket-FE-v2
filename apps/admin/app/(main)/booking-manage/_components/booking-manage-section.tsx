"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useQueryAdminTicketList } from "@uket/api/queries/admin-ticket";
import { SearchType, TicketResponse } from "@uket/api/types/admin-ticket";
import { useState } from "react";
import AdminFilterEventList from "../../../../components/admin-filter-event-list";
import StatusSelector from "../../../../components/status-selector";
import { useTicketBookParams } from "../../../../hooks/use-ticket-book-params";
import BookingDataTable from "./booking-data-table";
import DownloadCSV from "./download-csv";
import SearchInput from "./search-input";

export type Entry = TicketResponse;

export const columns = (pageIndex: number): ColumnDef<Entry>[] => [
  {
    accessorKey: "depositorName",
    header: "입금자명",
  },
  {
    accessorKey: "showTime",
    header: "티켓 날짜",
  },
  {
    accessorKey: "telephone",
    header: "전화번호",
  },
  {
    accessorKey: "updatedDate",
    header: "업데이트 일시",
  },
  {
    accessorKey: "orderDate",
    header: "주문 일시",
  },
  {
    accessorKey: "ticketStatus",
    header: "티켓 상태",
    cell: ({ row }) => {
      const ticketId = row.original.ticketId;
      const ticketStatus = row.original.ticketStatus;
      const depositorName = row.original.depositorName;

      return (
        <div className="flex justify-center">
          <StatusSelector
            key={ticketId}
            id={ticketId}
            status={ticketStatus}
            name={depositorName}
            page={pageIndex}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "friend",
    header: "지인",
    cell: ({ row }) => {
      return <div>{row.original.friend}</div>;
    },
  },
];

export default function BookingManageSection() {
  const { page, searchType, searchValue, uketEventId, updateQuery } =
    useTicketBookParams();

  const { data: ticketList } = useQueryAdminTicketList({
    searchType: searchType as SearchType,
    value: searchValue,
    page,
    uketEventId,
  });

  const handleTicketSearch = (type: SearchType, value: string) => {
    if (value.trim().length > 0) {
      updateQuery({
        page: 1,
        searchType: type,
        searchValue: value,
        uketEventId: uketEventId,
      });
    }
  };

  const [selectedEventName, setSelectedEventName] = useState("전체");

  const headers = [
    { key: "depositorName", label: "입금자명" },
    { key: "showTime", label: "티켓 날짜" },
    { key: "telephone", label: "전화번호" },
    { key: "updatedDate", label: "업데이트 일시" },
    { key: "orderDate", label: "주문 일시" },
    { key: "ticketStatus", label: "티켓 상태" },
    { key: "friend", label: "지인" },
  ];

  return (
    <main className="flex h-full flex-col grow gap-5 pl-16 pr-20 pt-20">
      <div className="flex items-end justify-between">
        <p className="text-[34px] font-bold">예매 내역 관리</p>
        <SearchInput onSearchTicket={handleTicketSearch} />
      </div>
      <main className="flex flex-col gap-3">
        <header className="flex justify-between items-center gap-4">
          <AdminFilterEventList
            currentEventId={uketEventId}
            onChangeEventId={(id, name) => {
              updateQuery({
                page: 1,
                uketEventId: id,
                searchType: null,
                searchValue: null,
              });
              setSelectedEventName(name ?? "전체");
            }}
          />
          {ticketList && (
            <DownloadCSV
              totalElements={ticketList.totalElements}
              headers={headers}
              filename={`${selectedEventName}_예매내역관리`}
            />
          )}
        </header>
        {ticketList && (
          <BookingDataTable
            columns={columns(page)}
            data={ticketList.timezoneData}
            pageIndex={page}
            setPageIndex={newPage => updateQuery({ page: newPage })}
            pageCount={ticketList.totalPages || 1}
          />
        )}
      </main>
    </main>
  );
}
