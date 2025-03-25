"use client";

import {
  Activity,
  ActivityContent,
  ActivityFooter,
} from "@ui/components/ui/activity";

import { Suspense } from "react";
import TicketBuyErrorFallback from "../../../../../components/error-fallback/ticket-buy-error-fallback";
import RetryApiErrorBoundary from "../../../../../components/retry-api-error-boundary";
import {
  FormSchemaType,
  FormType,
} from "../../../../../hooks/use-buy-ticket-form";
import { useReservationSelection } from "../../../../../hooks/use-select-reservation";
import { SelectHeader } from "../select-element";
import StepHeader from "../step-header";
import ReservationList from "../time/reservation-list";
import {
  StepControllerProps,
  StepNextController,
  StepPrevController,
} from "./step-controller";

interface StepTimeProps extends StepControllerProps {
  form: FormType;
  onSubmit: (data: FormSchemaType) => Promise<number>;
  eventName: string;
  showDate: string;
  showId: string;
}

export default function StepTime({
  form,
  onSubmit,
  eventName,
  showDate,
  showId,
  onNext,
  onPrev,
}: StepTimeProps) {
  const {
    selectedItem,
    selectedStartTime,
    selectedEndTime,
    handleSelectReservation,
  } = useReservationSelection(form);

  const formatSelectTime =
    selectedStartTime !== "" ? `${selectedStartTime} ~ ${selectedEndTime}` : "";

  const handleNextStep = async () => {
    const ticketId = await onSubmit(form.getValues());
    onNext(ticketId.toString());
    return true;
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
          <Suspense>
            <ReservationList
              showId={showId}
              selectedItem={selectedItem}
              onSelect={handleSelectReservation}
            />
          </Suspense>
        </RetryApiErrorBoundary>
      </ActivityContent>
      <ActivityFooter className="sticky bottom-0 z-50">
        <StepNextController
          onNext={() => handleNextStep()}
          disabled={selectedItem === null}
        />
      </ActivityFooter>
    </Activity>
  );
}
