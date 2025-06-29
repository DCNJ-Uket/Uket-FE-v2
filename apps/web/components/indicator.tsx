import { Badge, badgeVariants } from "@ui/components/ui/badge";
import { cn, VariantProps } from "@ui/lib/utils";
import { TicketItem } from "@uket/api/types/ticket";
import React from "react";

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

interface IndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  rounded?: boolean;
  variant?: TicketItem["ticketStatus"];
}

const VARIANT_MAPPING: Record<string, BadgeVariant> = {
  "입금 확인중": "deposit",
  "예매 완료": "reservation",
  "": "enter",
  "환불 요청": "refund",
};

export default function Indicator({
  title,
  rounded,
  variant,
  className,
}: IndicatorProps) {
  return (
    <Badge
      className={cn(
        "absolute left-6 top-2 px-2 py-1 font-normal",
        rounded ? "rounded-lg" : "rounded-md",
        !variant && "bg-[#f2f2f2c6]",
        className,
      )}
      variant={variant ? VARIANT_MAPPING[variant] : "secondary"}
    >
      {title}
    </Badge>
  );
}
