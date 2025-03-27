import { cn } from "@ui/lib/utils";
import React from "react";

// Ticket ui를 그리기 위해 필요한 element
interface CircleButtonProps {
  isSelected: boolean;
}

const CircleButton = ({ isSelected }: CircleButtonProps) => {
  return (
    <div
      className={cn(
        "flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-[#CCCCCC]",
        isSelected && "bg-brand",
      )}
    >
      <div
        className={cn(
          "aspect-square h-3 w-3 rounded-full bg-[#F2F2F2]",
          isSelected && "bg-[#D7CDFE]",
        )}
      ></div>
    </div>
  );
};

interface OverlayProps {
  disabledMent?: string;
  alreadyStart?: boolean;
}

const Overlay = (props: OverlayProps) => {
  const { disabledMent, alreadyStart } = props;

  return (
    <>
      {disabledMent || alreadyStart ? (
        <div className="absolute left-0 top-1/2 z-30 flex w-full -translate-y-1/2 items-center justify-center">
          <div className="whitespace-nowrap text-center text-lg font-extrabold text-[#FD724F]">
            {disabledMent && <p>{disabledMent} OPEN</p>}
            {alreadyStart && <p>이미 시작된 공연입니다.</p>}
          </div>
        </div>
      ) : (
        <div className="absolute inset-y-0 right-3 z-40 flex w-12 items-center justify-center bg-[#D9D9D9] text-xs font-bold">
          <div className="rotate-90 whitespace-nowrap text-[#FD724F]">
            Sold Out
          </div>
        </div>
      )}
    </>
  );
};

interface TicketQuantityItemProps {
  title: string;
  amount: number;
  color: string;
}

const TicketQuantityItem = ({
  title,
  amount,
  color,
}: TicketQuantityItemProps) => {
  const formatAmount = amount.toLocaleString("en-US");

  return (
    <div className="flex gap-2">
      <p className="font-medium">{title}</p>
      <p className={cn(`text-[#${color}]`)}>{formatAmount} 개</p>
    </div>
  );
};

interface TicketHeaderProps {
  title: string;
  isSelected: boolean;
  fontStyle: string;
}

const TicketHeader = ({ title, isSelected, fontStyle }: TicketHeaderProps) => {
  return (
    <div className="flex justify-between">
      <div className={fontStyle}>{title}</div>
      <div className="self-center">
        <CircleButton isSelected={isSelected} />
      </div>
    </div>
  );
};

const TicketFooter = ({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`flex gap-10 text-xs ${className}`} {...rest}>
      {children}
    </div>
  );
};

const TicketDivider = () => {
  return <div className="my-[1%] w-full border-[0.5px] border-[#CCCCCC]"></div>;
};

interface TicketContainerProps {
  children: React.ReactNode;
  isDisabled: boolean;
  isSoldOut: boolean;
  onSelect: () => void;
}

const TicketContainer = ({
  children,
  isDisabled,
  isSoldOut,
  onSelect,
}: TicketContainerProps) => {
  return (
    <div
      className={cn(
        "z-40 flex w-full flex-col gap-[9px] rounded-lg bg-white px-5 pb-[15px] pt-[17px] shadow-lg",
        (isDisabled || isSoldOut) &&
          "pointer-events-none bg-[#D9D9D9] opacity-60",
        isDisabled && "blur-[2px]",
      )}
      onClick={onSelect}
    >
      {children}
    </div>
  );
};

export {
  CircleButton,
  Overlay,
  TicketContainer,
  TicketDivider,
  TicketFooter,
  TicketHeader,
  TicketQuantityItem,
};
