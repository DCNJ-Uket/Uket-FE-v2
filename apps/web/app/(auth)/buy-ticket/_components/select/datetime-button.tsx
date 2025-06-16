import { cn } from "@ui/lib/utils";
import { formatDate } from "@uket/util/time";

interface DateTimeButtonProps {
  isDate: boolean;
  date: string;
  selected?: boolean;
  disabled?: boolean;
}

export default function DateTimeButton({
  isDate = true,
  date,
  selected = false,
  disabled = false,
}: DateTimeButtonProps) {
  const formatText = isDate
    ? formatDate(date, "userTicketDate")
    : formatDate(date, "time");

  return (
    <div
      className={cn(
        "px-4 py-2 rounded-lg text-center cursor-pointer relative",
        {
          "border-[1.5px] border-brand text-brand font-bold":
            selected && !disabled,
          "border-[0.5px] border-[#8989A1] text-[#8989A1] font-normal":
            !selected && !disabled,
          "bg-[#D9D9D9] text-white cursor-not-allowed pointer-events-none":
            disabled, // 비활성화 스타일
        },
      )}
    >
      {formatText}

      {/* 대각선 흰색 선 */}
      {disabled && (
        <div className="absolute left-1/2 top-1/2 w-full h-[0.75px] bg-white -rotate-45 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      )}
    </div>
  );
}
