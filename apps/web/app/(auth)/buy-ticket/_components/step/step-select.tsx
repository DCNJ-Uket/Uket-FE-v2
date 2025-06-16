import {
  Activity,
  ActivityContent,
  ActivityFooter,
} from "@ui/components/ui/activity";

import { useState } from "react";

import DateTimeSelectField from "../select/datetime-select-field";
import PerformerSelectField from "../select/performer-select-field";
import TicketCountField from "../select/ticket-count-field";
import {
  StepControllerProps,
  StepNextController,
  StepPrevController,
} from "./step-controller";

interface StepSelectProps extends StepControllerProps {
  eventName: string;
  eventId: string;
}

const ticketPrice = 5000;

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
  const [ticketCount, setTicketCount] = useState<number>(null);

  const filteredTimes = sampleTimesWithTickets.filter(
    ({ date }) =>
      new Date(date).toDateString() === new Date(selectedDate).toDateString(),
  );

  return (
    <Activity>
      <StepPrevController onPrev={onPrev} />
      <ActivityContent className="py-3 px-4 justify-start gap-8">
        <h1 className="text-[21px] font-bold">{eventName}</h1>

        <DateTimeSelectField
          dates={sampleDates}
          times={filteredTimes}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          setSelectedDate={setSelectedDate}
          setSelectedTime={setSelectedTime}
        />

        <div className="-mx-4 h-[2px] bg-[#f2f2f2]"></div>

        <PerformerSelectField
          performer={performer}
          setPerformer={setPerformer}
          performerList={samplePerformers}
        />

        <div className="-mx-4 h-[2px] bg-[#f2f2f2]"></div>

        <TicketCountField
          eventName={eventName}
          selectedTime={selectedTime}
          remaining={
            sampleTimesWithTickets.find(t => t.date === selectedTime)?.remaining
          }
          price={ticketPrice}
          onChange={setTicketCount}
        />
      </ActivityContent>

      <ActivityFooter className="sticky bottom-0 z-50">
        <div className="border-t-2 border-t-[#f2f2f2] flex justify-between p-7 font-bold text-base bg-white">
          <p>총 결제금액</p>
          <p className="text-brand">
            {(ticketPrice * ticketCount).toLocaleString()} 원
          </p>
        </div>
        <StepNextController
          onNext={() => onNext()}
          disabled={!(selectedDate && selectedTime)}
        />
      </ActivityFooter>
    </Activity>
  );
}
