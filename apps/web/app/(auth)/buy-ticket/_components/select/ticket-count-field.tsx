import { formatDate } from "@uket/util/time";
import CounterButton from "./counter-button";

interface TicketCountFieldProps {
  eventName: string;
  selectedTime: string | undefined;
  remaining: number | undefined;
  price: number;
  onChange: (val: number) => void;
}

export default function TicketCountField({
  eventName,
  selectedTime,
  remaining,
  price,
  onChange,
}: TicketCountFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium">수량 선택</h3>
      {selectedTime && (
        <div className="rounded-lg flex flex-col gap-2 p-3.5 bg-[#fafafa] border-[0.5px] border-[#f2f2f2]">
          <h3 className="font-medium">{eventName}</h3>
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex gap-2">
              <span>일시</span>
              <span className="text-brand">
                {formatDate(selectedTime, "userTicketFullDate")}
              </span>
            </div>
            <div className="flex gap-2">
              <span>가격</span>
              <span>{price.toLocaleString()}</span>
            </div>
            <CounterButton remaining={remaining!} onChange={onChange} />
          </div>
        </div>
      )}
    </div>
  );
}
