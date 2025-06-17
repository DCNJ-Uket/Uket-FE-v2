import {
  Activity,
  ActivityContent,
  ActivityFooter,
} from "@ui/components/ui/activity";

import { useState } from "react";

import { useQueryReservationInfoList } from "@uket/api/queries/reservation";
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

const samplePerformers = ["장원영", "안유진", "리즈", "이서", "가을"];

export default function StepSelect({
  onNext,
  onPrev,
  eventName,
  eventId,
}: StepSelectProps) {
  const { ticketPrice, dates, times } = useQueryReservationInfoList(
    Number(eventId),
  ).data;

  const [selectedDate, setSelectedDate] = useState<string>(dates[0]!.date);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [performer, setPerformer] = useState<string>("");
  const [ticketCount, setTicketCount] = useState<number | null>(null);

  const filteredTimes = times.filter(
    ({ time }) =>
      new Date(time).toDateString() === new Date(selectedDate).toDateString(),
  );

  return (
    <Activity>
      <StepPrevController onPrev={onPrev} />
      <ActivityContent className="py-3 px-4 justify-start gap-8">
        <h1 className="text-[21px] font-bold">{eventName}</h1>

        <DateTimeSelectField
          dates={dates}
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
          remaining={times.find(t => t.time === selectedTime)?.remaining}
          price={ticketPrice}
          onChange={setTicketCount}
        />
      </ActivityContent>

      <ActivityFooter className="sticky bottom-0 z-50">
        <div className="border-t-2 border-t-[#f2f2f2] flex justify-between p-7 font-bold text-base bg-white">
          <p>총 결제금액</p>
          <p className="text-brand">
            {(ticketPrice * (ticketCount ?? 0)).toLocaleString()} 원
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
