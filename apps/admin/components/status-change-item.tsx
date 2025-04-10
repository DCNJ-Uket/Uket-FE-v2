import { EVENT_STATUS_INFO } from "@uket/api/types/admin-event";
import { TICKET_STATUS_INFO } from "@uket/api/types/admin-ticket";
import { cn } from "@uket/ui/lib/utils";

interface StatusChangeItemProps {
  isTicket?: boolean;
  statusText: string;
  before?: boolean;
}
export default function StatusChangeItem({
  isTicket = true,
  statusText,
  before,
}: StatusChangeItemProps) {
  const statusInfo = isTicket ? TICKET_STATUS_INFO : EVENT_STATUS_INFO;
  const color = statusInfo.find(item => item.text === statusText)!.color;

  return (
    <span className="flex items-center gap-1.5">
      <span
        className={cn("text-[13px] text-black", before && "text-[#8989A1]")}
      >
        {statusText}
      </span>
      <span
        className="h-4 w-4 rounded-full"
        style={{ backgroundColor: color }}
      ></span>
    </span>
  );
}
