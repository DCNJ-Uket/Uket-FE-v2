"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@ui/components/ui/badge";
import { cn } from "@ui/lib/utils";
import { useQueryAdminUserList } from "@uket/api/queries/admin-user";
import { Content } from "@uket/api/types/admin-user";
import { useRouter, useSearchParams } from "next/navigation";
import UserDataTable from "./user-data-table";
import UserRemoveButton from "./user-remove-button";

export type Entry = Content;

// TODO: 소속 데이터 변경
export const columns: ColumnDef<Entry>[] = [
  {
    accessorKey: "id",
    header: "번호",
    id: "id",
  },
  {
    accessorKey: "name",
    header: "이름",
  },
  {
    accessorKey: "email",
    header: "아이디",
  },
  {
    accessorKey: "organization",
    header: "소속",
  },
  {
    accessorKey: "isSuperAdmin",
    header: () => <div>권한</div>,
    cell: ({ row }) => {
      const isAdmin = row.original.isSuperAdmin;
      const role = isAdmin ? "관리자" : "멤버";
      const style = isAdmin
        ? "bg-[#17171B] text-white hover:bg-[#17171B]"
        : "bg-[#F0EDFD] text-brand hover:bg-[#F0EDFD]";

      return (
        <Badge
          className={cn(
            "h-8 w-28 justify-center rounded-lg text-base cursor-pointer font-medium",
            style,
          )}
        >
          {role}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "변경",
    cell: ({ row }) => {
      const { id, name, email } = row.original;
      return <UserRemoveButton userId={id} userName={name} userEmail={email} />;
    },
  },
];

export default function UserTableSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  const { data } = useQueryAdminUserList({
    page: currentPage,
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <section className="flex flex-col gap-3">
      <UserDataTable
        columns={columns}
        data={data.content}
        pageIndex={currentPage}
        setPageIndex={handlePageChange}
        pageCount={data.totalPages || 1}
      />
    </section>
  );
}
