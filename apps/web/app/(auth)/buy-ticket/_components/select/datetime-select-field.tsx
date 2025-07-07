import { formatDate } from "@uket/util/time";

import { useEffect } from "react";
import DateTimeButton from "./datetime-button";

interface DateTimeSelectFieldProps {
  dates: { id: number; date: string }[];
  times: { id: number; time: string; remaining: number }[];
  selectedDate: string;
  selectedTime: string | null;
  setSelectedDate: (date: string) => void;
  setSelectedTime: (date: string) => void;
}

export default function DateTimeSelectField({
  dates,
  times,
  selectedDate,
  selectedTime,
  setSelectedDate,
  setSelectedTime,
}: DateTimeSelectFieldProps) {
  const selected = times.find(t => t.time === selectedTime);
  const showWarning =
    selected &&
    formatDate(selectedDate, "compact") ===
      formatDate(selected.time, "compact") &&
    selected.remaining <= 10;

  const isOnlyOneDate = dates.length === 1;
  const isOnlyOneTime = times.length === 1;

  useEffect(() => {
    if (isOnlyOneTime) {
      setSelectedTime(times[0]!.time);
    }
  }, [isOnlyOneTime, selectedTime, times, setSelectedTime]);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h3 className="font-medium">날짜 선택</h3>
        <div className="flex gap-2 flex-wrap">
          {dates.map(({ id, date }) => (
            <div key={id} onClick={() => setSelectedDate(date)}>
              <DateTimeButton
                isDate
                date={date}
                selected={selectedDate === date}
                isOnlyOne={isOnlyOneDate}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-3">
          <h3 className="font-medium">시간 선택</h3>
          <div className="flex gap-2 flex-wrap">
            {times.map(({ id, time, remaining }) => {
              const isDisabled = remaining === 0;
              return (
                <div
                  key={id}
                  onClick={() => !isDisabled && setSelectedTime(time)}
                >
                  <DateTimeButton
                    isDate={false}
                    date={time}
                    selected={selectedTime === time}
                    disabled={isDisabled}
                    isOnlyOne={isOnlyOneTime}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {showWarning && (
          <p className="mt-3 text-sm text-red-500">
            현재 잔여 티켓 {selected.remaining}매
          </p>
        )}
      </div>
    </section>
  );
}
