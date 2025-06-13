import {
  Activity,
  ActivityContent,
  ActivityFooter,
} from "@ui/components/ui/activity";

import { useState } from "react";
import SelectDateTimeField from "../select/select-datetime-field";
import {
  StepControllerProps,
  StepNextController,
  StepPrevController,
} from "./step-controller";

interface StepSelectProps extends StepControllerProps {
  eventName: string;
  eventId: string;
}
const sampleDates = [
  "2025-06-13T00:00:00.000Z",
  "2025-06-14T00:00:00.000Z",
  "2025-06-15T00:00:00.000Z",
];

const sampleTimesWithTickets = [
  { date: "2025-06-13T02:00:00.000Z", remaining: 15 },
  { date: "2025-06-13T04:00:00.000Z", remaining: 8 },
  { date: "2025-06-13T06:00:00.000Z", remaining: 3 },
];

export default function StepSelect({
  onNext,
  onPrev,
  eventName,
  eventId,
}: StepSelectProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <Activity>
      <StepPrevController onPrev={onPrev} />
      <h1 className="text-[21px] font-bold">{eventName}</h1>
      <ActivityContent className="bg-[#F2F2F2] py-6 justify-start space-y-6">
        {/* 날짜 선택 필드 */}
        <div className="flex gap-2 flex-wrap">
          {sampleDates.map(date => (
            <div key={date} onClick={() => setSelectedDate(date)}>
              <SelectDateTimeField
                isDate
                date={date}
                selected={selectedDate === date}
              />
            </div>
          ))}
        </div>

        {/* 시간 선택 필드 */}
        <div className="flex gap-2 flex-wrap">
          {sampleTimesWithTickets.map(({ date }) => (
            <div key={date} onClick={() => setSelectedTime(date)}>
              <SelectDateTimeField
                isDate={false}
                date={date}
                selected={selectedTime === date}
              />
            </div>
          ))}
        </div>

        {/* 선택한 시간 필드 하단에 에러 메시지 표시 */}
        {(() => {
          const selected = sampleTimesWithTickets.find(
            t => t.date === selectedTime,
          );
          return selected && selected.remaining <= 10 ? (
            <p className="mt-2 text-sm text-red-500">
              현재 잔여 티켓 {selected.remaining}매
            </p>
          ) : null;
        })()}
      </ActivityContent>

      <ActivityFooter className="sticky bottom-0 z-50">
        <StepNextController
          onNext={() => onNext()}
          disabled={!(selectedDate && selectedTime)}
        />
      </ActivityFooter>
    </Activity>
  );
}
