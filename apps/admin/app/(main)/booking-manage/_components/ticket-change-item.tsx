import { TICKET_STATUS_INFO } from "@uket/api/types/admin-ticket";
import { cn } from "@uket/ui/lib/utils";

interface TicketChangeItemProps {
  status: string;
  before?: boolean;
}
export default function TicketChangeItem({
  status,
  before,
}: TicketChangeItemProps) {
  const color = TICKET_STATUS_INFO.find(item => item.text === status)!.color;

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
