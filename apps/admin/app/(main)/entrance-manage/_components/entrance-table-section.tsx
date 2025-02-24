"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useQueryEntranceList } from "@uket/api/queries/admin-entrance";
import { Content } from "@uket/api/types/admin-entrance";
import { TICKET_STATUS_INFO } from "@uket/api/types/admin-ticket";
import { Button } from "@uket/ui/components/ui/button";
import { RefreshCwIcon } from "@uket/ui/components/ui/icon";
import { useRouter, useSearchParams } from "next/navigation";
import EntranceDataTable from "./entrance-data-table";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  const { data, refetch, isRefetching } = useQueryEntranceList({
    page: currentPage,
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <section className="flex flex-col gap-3">
      <aside className="flex items-center justify-end gap-2">
        <p className="text-sm text-[#9191A1]">
          입장 조회 내역은 10초마다 또는 새로고침 버튼을 누르면 갱신됩니다.
        </p>
        <Button
          disabled={isRefetching}
          variant="ghost"
          className="flex items-center gap-2 text-desc hover:bg-gray-200"
          onClick={() => refetch()}
        >
          <RefreshCwIcon className="h-6 w-6 rounded-md bg-white p-1" />
          <span className="text-sm font-bold">내역 갱신</span>
        </Button>
      </aside>
      <EntranceDataTable
        columns={columns}
        data={data.content}
        pageIndex={currentPage}
        setPageIndex={handlePageChange}
        pageCount={data.totalPages || 1}
      />
    </section>
  );
}
