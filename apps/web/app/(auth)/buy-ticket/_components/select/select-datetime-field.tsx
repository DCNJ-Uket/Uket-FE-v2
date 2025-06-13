import { cn } from "@ui/lib/utils";

interface SelectDateTimeFieldProps {
  isDate: boolean;
  date: string;
  selected?: boolean;
}

const WEEKDAY_KR = ["일", "월", "화", "수", "목", "금", "토"];

export default function SelectDateTimeField({
  isDate = true,
  date,
  selected = false,
}: SelectDateTimeFieldProps) {
  const d = new Date(date);

  const formatText = isDate
    ? `${String(d.getMonth() + 1).padStart(2, "0")}.${String(
        d.getDate(),
      ).padStart(2, "0")}.(${WEEKDAY_KR[d.getDay()]})`
    : `${String(d.getHours()).padStart(2, "0")}:${String(
        d.getMinutes(),
      ).padStart(2, "0")}`;

  return (
    <div
      className={cn("px-4 py-2 rounded-lg text-center cursor-pointer", {
        "border-[1.5px] border-brand text-brand font-bold": selected,
        "border-[0.5px] border-[#8989A1] text-[#8989A1] font-normal": !selected,
      })}
    >
      {formatText}
    </div>
  );
}
