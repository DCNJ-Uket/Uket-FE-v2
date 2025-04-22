import {
  Activity,
  ActivityContent,
  ActivityFooter,
} from "@ui/components/ui/activity";

import { Suspense, useState } from "react";
import { useFormContext } from "react-hook-form";
import TicketBuyErrorFallback from "../../../../../components/error-fallback/ticket-buy-error-fallback";
import RetryApiErrorBoundary from "../../../../../components/retry-api-error-boundary";
import BuyTicketLoadingFallback from "../buy-ticket-loading-fallback";
import { SelectHeader } from "../select-element";
import StepHeader from "../step-header";
import ReservationList from "../time/reservation-list";
import {
  StepControllerProps,
  StepNextController,
  StepPrevController,
} from "./step-controller";

interface StepTimeProps extends StepControllerProps {
  eventName: string;
  showDate: string;
  showId: string;
}

export default function StepTime({
  eventName,
  showDate,
  showId,
  onNext,
  onPrev,
}: StepTimeProps) {
  const { watch } = useFormContext();
  const selectedItem = watch("reservationId");

  const [formatSelectTime, setFormatSelectTime] = useState("");

  const handleSelectReservation = (startTime: string, endTime: string) => {
    setFormatSelectTime(`${startTime} ~ ${endTime}`);
  };

  return (
    <Activity>
      <StepPrevController onPrev={onPrev} />
      <SelectHeader
        eventName={eventName}
        formatShowDate={showDate}
        formatSelectTime={formatSelectTime}
      />
      <ActivityContent className="bg-[#F2F2F2] py-6">
        <StepHeader step={"02"} content={"예매 시간을 선택해 주세요."} />
        <RetryApiErrorBoundary fallback={<TicketBuyErrorFallback />}>
          <Suspense fallback={<BuyTicketLoadingFallback isTime />}>
            <ReservationList
              showId={showId}
              onSelect={handleSelectReservation}
            />
          </Suspense>
        </RetryApiErrorBoundary>
      </ActivityContent>
      <ActivityFooter className="sticky bottom-0 z-50">
        <StepNextController
          onNext={() => onNext(formatSelectTime)}
          disabled={selectedItem === -1}
        />
      </ActivityFooter>
    </Activity>
  );
}
