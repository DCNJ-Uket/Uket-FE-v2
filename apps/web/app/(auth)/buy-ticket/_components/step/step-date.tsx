"use client";

import {
  Activity,
  ActivityContent,
  ActivityFooter,
} from "@ui/components/ui/activity";

import { Suspense, useState } from "react";
import TicketBuyErrorFallback from "../../../../../components/error-fallback/ticket-buy-error-fallback";
import RetryApiErrorBoundary from "../../../../../components/retry-api-error-boundary";
import { useSelectItem } from "../../../../../hooks/use-select-item";
import { useSelectShow } from "../../../../../hooks/use-select-show";
import BuyTicketLoadingFallback from "../buy-ticket-loading-fallback";
import { SelectHeader } from "../select-element";
import ShowList from "../show/show-list";
import StepHeader from "../step-header";
import {
  StepControllerProps,
  StepNextController,
  StepPrevController,
} from "./step-controller";

interface StepDateProps extends StepControllerProps {
  eventName: string;
  eventId: string;
}

export default function StepDate({
  onNext,
  onPrev,
  eventName,
  eventId,
}: StepDateProps) {
  const [showId, setShowId] = useState<number>(-1);
  const handleShowId = (id: number) => {
    setShowId(id);
  };

  const {
    selectedShowDate,
    setSelectedShowDate,
    selectedShowName,
    setSelectedShowName,
  } = useSelectShow();

  const { selectedItem, handleSelectItem } = useSelectItem<number>();

  const handleSelectDate = (id: number, name: string, startDate: string) => {
    handleSelectItem(id);
    handleShowId(id);
    setSelectedShowDate(startDate);
    setSelectedShowName(name);
  };

  const formatShowDate =
    selectedShowDate !== ""
      ? `${selectedShowName} (${selectedShowDate.slice(2)})`
      : "";

  return (
    <Activity>
      <StepPrevController onPrev={onPrev} />
      <SelectHeader eventName={eventName} formatShowDate={formatShowDate} />
      <ActivityContent className="bg-[#F2F2F2] py-6">
        <StepHeader step={"01"} content={"예매 날짜를 선택해 주세요."} />
        <RetryApiErrorBoundary fallback={<TicketBuyErrorFallback />}>
          <Suspense fallback={<BuyTicketLoadingFallback />}>
            <ShowList
              eventId={eventId!}
              selectedItem={selectedItem}
              onSelect={handleSelectDate}
            />
          </Suspense>
        </RetryApiErrorBoundary>
      </ActivityContent>
      <ActivityFooter className="sticky bottom-0 z-50">
        <StepNextController
          onNext={() => onNext(showId.toString(), formatShowDate)}
          disabled={selectedItem === null}
        />
      </ActivityFooter>
    </Activity>
  );
}
