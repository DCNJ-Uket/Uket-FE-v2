"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useQueryEntranceList } from "@uket/api/queries/admin-entrance";
import { Content } from "@uket/api/types/admin-entrance";
import { TICKET_STATUS_INFO } from "@uket/api/types/admin-ticket";
import AdminFilterEventList from "../../../../components/admin-filter-event-list";
import { useEntranceParams } from "../../../../hooks/use-entrance-params";
import EntranceDataTable from "./entrance-data-table";

function maskPhone(phone: string) {
  // 010-1234-5678 또는 01012345678 모두 지원
  return phone.replace(/(\d{3})-?(\d{4})-?(\d{4})/, "$1-****-$3");
}

export type Entry = Content;

export const columns: ColumnDef<Entry>[] = [
  {
    accessorKey: "enterTime",
    header: () => <div>입장 시간</div>,
  },
  {
    accessorKey: "name",
    header: "입금자명",
  },
  {
    accessorKey: "ticketDate",
    header: "티켓 날짜",
  },
  {
    accessorKey: "phoneNumber",
    header: "전화번호",
    cell: ({ row }) => {
      const phone = row.original.phoneNumber;
      return <span>{maskPhone(phone)}</span>;
    },
  },
  {
    accessorKey: "ticketStatus",
    header: () => <div>결과</div>,
    cell: ({ row }) => {
      const ticketStatus = TICKET_STATUS_INFO.find(
        item => item.value === row.getValue("ticketStatus"),
      );

      return (
        <div className="rounded-lg bg-[#F0EDFD] py-1 text-sm font-medium text-[#7250FD]">
          {ticketStatus!.text}
        </div>
      );
    },
  },
];

export default function EntranceTableSection() {
  const { page, uketEventId, updateQuery } = useEntranceParams();

  const { data } = useQueryEntranceList({
    page: page,
    uketEventId,
  });

  return (
    <section className="flex flex-col gap-3">
      <header className="flex justify-between items-center gap-4">
        <AdminFilterEventList
          currentEventId={uketEventId}
          onChangeEventId={id => updateQuery({ page: 1, uketEventId: id })}
        />
      </header>
      <EntranceDataTable
        columns={columns}
        data={data.content}
        pageIndex={page}
        setPageIndex={newPage => updateQuery({ page: newPage })}
        pageCount={data.totalPages || 1}
      />
    </section>
  );
}
