"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useQueryAdminTicketList } from "@uket/api/queries/admin-ticket";
import { SearchType, TicketResponse } from "@uket/api/types/admin-ticket";
import { Button } from "@uket/ui/components/ui/button";
import { useTicketBookParams } from "../../../../hooks/use-ticket-book-params";
import BookingDataTable from "./booking-data-table";
import SearchInput from "./search-input";
import TicketStatusSelector from "./ticket-status-selector";

export type Entry = TicketResponse;

export const columns = (pageIndex: number): ColumnDef<Entry>[] => [
  {
    accessorKey: "depositorName",
    header: "입금자명",
  },
  {
    accessorKey: "userType",
    header: "사용자 구분",
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
          <TicketStatusSelector
            key={ticketId}
            id={ticketId}
            status={ticketStatus}
            userName={depositorName}
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
      return <div>{row.original.formAnswers[0]?.answer}</div>;
    },
  },
];

export default function BookingManageSection() {
  const { page, searchType, searchValue, updateQuery } = useTicketBookParams();

  const { data: ticketList } = useQueryAdminTicketList({
    searchType: searchType as SearchType,
    value: searchValue,
    page,
  });

  const handleViewAllTicket = () => {
    updateQuery({ page: 1, searchType: null, searchValue: null });
  };

  const handleTicketSearch = (type: SearchType, value: string) => {
    if (value.trim().length > 0) {
      updateQuery({ page: 1, searchType: type, searchValue: value });
    }
  };

  return (
    <main className="flex flex-col gap-3">
      <header className="flex justify-between items-center gap-4">
        <Button
          size="sm"
          variant="link"
          className="bg-transparent mb-1 text-sm font-medium text-desc underline decoration-1 hover:cursor-pointer hover:bg-gray-200 w-fit"
          onClick={handleViewAllTicket}
        >
          전체 내역 보기
        </Button>
        <SearchInput onSearchTicket={handleTicketSearch} />
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
  );
}
