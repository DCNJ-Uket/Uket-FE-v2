import { useEffect, useState } from "react";
import {
  Overlay,
  TicketContainer,
  TicketDivider,
  TicketFooter,
  TicketHeader,
  TicketQuantityItem,
} from "../ticket-element";

interface ReservationItemProps {
  startDate: string;
  startTime: string;
  endTime: string;
  reservedCount: number;
  totalCount: number;
  isSelected: boolean;
  onSelect: () => void;
}

export default function ReservationItem({
  startDate,
  startTime,
  endTime,
  reservedCount,
  totalCount,
  isSelected,
  onSelect,
}: ReservationItemProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSoldOut, setIsSoldOut] = useState(false);

  const leftCount =
    totalCount - reservedCount < 0 ? 0 : totalCount - reservedCount;

  useEffect(() => {
    setIsSoldOut(leftCount === 0);
  }, [leftCount]);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const showStartTime = new Date(startDate).getTime();
    setIsDisabled(currentTime > showStartTime);
  }, [startDate]);

  return (
    <div className="relative">
      {isDisabled && <Overlay alreadyStart />}
      {isSoldOut && !isDisabled && <Overlay />}
      <TicketContainer
        isDisabled={isDisabled}
        isSoldOut={isSoldOut}
        onSelect={onSelect}
      >
        <TicketHeader
          title={`${startTime} ~ ${endTime}`}
          fontStyle="text-[32px] font-extrabold"
          isSelected={isSelected}
        />
        <TicketDivider />
        <TicketFooter>
          <TicketQuantityItem
            title="남은 티켓 수량"
            amount={leftCount}
            color="FD724F"
          />
          <TicketQuantityItem
            title="총 티켓 수량"
            amount={totalCount}
            color="5E5E6E"
          />
        </TicketFooter>
      </TicketContainer>
    </div>
  );
}
