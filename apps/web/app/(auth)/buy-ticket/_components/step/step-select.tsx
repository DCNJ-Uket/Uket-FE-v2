import {
  Activity,
  ActivityContent,
  ActivityFooter,
} from "@ui/components/ui/activity";
import { formatDate } from "@uket/util/time";

import { useState } from "react";
import SelectDateTimeField from "../select/select-datetime-field";
import SelectPerformer from "../select/select-performer";
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
  { date: "2025-06-13T02:00:00.000+09:00", remaining: 15 },
  { date: "2025-06-13T04:00:00.000+09:00", remaining: 8 },
  { date: "2025-06-13T06:00:00.000+09:00", remaining: 3 },
  { date: "2025-06-14T02:00:00.000+09:00", remaining: 10 },
  { date: "2025-06-15T03:00:00.000+09:00", remaining: 0 },
];

const samplePerformers = ["장원영", "안유진", "리즈", "이서", "가을"];

export default function StepSelect({
  onNext,
  onPrev,
  eventName,
}: StepSelectProps) {
  const [selectedDate, setSelectedDate] = useState<string>(sampleDates[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [performer, setPerformer] = useState<string>("");

  const filteredTimes = sampleTimesWithTickets.filter(
    ({ date }) =>
      new Date(date).toDateString() === new Date(selectedDate).toDateString(),
  );

  return (
    <Activity>
      <StepPrevController onPrev={onPrev} />
      <ActivityContent className="py-3 px-4 justify-start space-y-6">
        <h1 className="text-[21px] font-bold">{eventName}</h1>

        {/* 날짜 선택 필드 */}
        <div className="flex flex-col gap-3">
          <h3 className="font-medium">날짜 선택</h3>
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
        </div>

        {/* 시간 선택 필드 */}
        <div className="flex flex-col gap-3">
          <h3 className="font-medium">시간 선택</h3>
          <div className="flex gap-2 flex-wrap">
            {filteredTimes.map(({ date, remaining }) => {
              const isDisabled = remaining === 0;
              return (
                <div
                  key={date}
                  onClick={() => {
                    if (!isDisabled) {
                      setSelectedTime(date);
                    }
                  }}
                >
                  <SelectDateTimeField
                    isDate={false}
                    date={date}
                    selected={selectedTime === date}
                    disabled={isDisabled}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* 선택한 시간 필드 하단에 에러 메시지 표시 */}
        {(() => {
          const selected = sampleTimesWithTickets.find(
            t => t.date === selectedTime,
          );
          return selected &&
            formatDate(selectedDate, "compact") ===
              formatDate(selected.date, "compact") &&
            selected.remaining <= 10 ? (
            <p className="mt-2 text-sm text-red-500">
              현재 잔여 티켓 {selected.remaining}매
            </p>
          ) : null;
        })()}

        {/* 초대 지인 */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <h3 className="font-medium">초대 지인</h3>
            <p className="text-xs font-normal text-[#8989A1]">*선택</p>
          </div>
          <SelectPerformer
            performer={performer}
            setPerformer={setPerformer}
            performerList={samplePerformers}
          />
        </div>
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
