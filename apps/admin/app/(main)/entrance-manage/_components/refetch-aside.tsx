'use client'

import { useQueryEntranceList } from "@uket/api/queries/admin-entrance";
import { Button } from "@uket/ui/components/ui/button";
import { RefreshCwIcon } from "@uket/ui/components/ui/icon";
import { useEntranceParams } from "../../../../hooks/use-entrance-params";

export default function RefetchAside() {
  const { page, uketEventId } = useEntranceParams();

  const { refetch, isRefetching } = useQueryEntranceList({
    page: page,
    uketEventId,
  });

  return (
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
  );
}
