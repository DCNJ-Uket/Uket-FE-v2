import { TICKET_INFO_STATUS_INFO } from "@uket/api/types/admin-ticket-info";
import { cn } from "@uket/ui/lib/utils";

interface TicketInfoChangeItemProps {
  status: string;
  before?: boolean;
}
export default function TicketInfoChangeItem({
  status,
  before,
}: TicketInfoChangeItemProps) {
  const color = TICKET_INFO_STATUS_INFO.find(
    item => item.value === status,
  )!.color;

  return (
    <span className="flex items-center gap-1.5">
      <span
        className={cn("text-[13px] text-black", before && "text-[#8989A1]")}
      >
        {status}
      </span>
      <span
        className="h-4 w-4 rounded-full"
        style={{ backgroundColor: color }}
      ></span>
    </span>
  );
}
