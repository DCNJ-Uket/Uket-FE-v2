import { useEffect, useState } from "react";
import {
  Overlay,
  TicketContainer,
  TicketDivider,
  TicketFooter,
  TicketHeader,
  TicketQuantityItem,
} from "../ticket-element";

interface ShowItemProps {
  name: string;
  showDate: string;
  startTime: string;
  endTime: string;
  ticketingDate: string;
  totalTicketCount: number;
  isSelected: boolean;
  onSelect: () => void;
}

export default function ShowItem({
  name,
  showDate,
  startTime,
  endTime,
  ticketingDate,
  totalTicketCount,
  isSelected,
  onSelect,
}: ShowItemProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSoldOut, setIsSoldOut] = useState(false);

  useEffect(() => {
    setIsSoldOut(totalTicketCount <= 0);
  }, [totalTicketCount]);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const ticketingTime = new Date(ticketingDate).getTime();
    setIsDisabled(currentTime < ticketingTime);
  }, [ticketingDate]);

  return (
    <div className="relative">
      {isDisabled && <Overlay disabledMent={ticketingDate} />}
      {isSoldOut && !isDisabled && <Overlay />}

      <TicketContainer
        isDisabled={isDisabled}
        isSoldOut={isSoldOut}
        onSelect={onSelect}
      >
        <TicketHeader
          title={name}
          fontStyle="text-[42px] font-black"
          isSelected={isSelected}
        />
        <TicketDivider />
        <TicketFooter>
          <div className="flex gap-2">
            <p className="font-medium">일시</p>
            <div>
              <p className="text-[#5E5E6E]">{showDate}</p>
              <p className="text-[#5E5E6E]">
                {startTime} ~ {endTime}
              </p>
            </div>
          </div>
          <TicketQuantityItem
            title="티켓 수량"
            amount={totalTicketCount}
            color="5E5E6E"
          />
        </TicketFooter>
      </TicketContainer>
    </div>
  );
}
