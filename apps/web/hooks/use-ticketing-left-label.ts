"use client";

import { useEffect, useState } from "react";
import { differenceInSeconds, format, ko, parseISO } from "@uket/util/time";
import { TicketingStatus } from "@uket/api/types/uket-event";

const formatSecondsToHHMMSS = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
};

export default function useTicketingLeftLabel(
  status: TicketingStatus,
  ticketingStartDate: string,
  ticketingEndDate: string,
) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const start = parseISO(ticketingStartDate);
    const end = parseISO(ticketingEndDate);

    const compute = () => {
      const now = new Date();
      if (status === "티켓팅_진행중") {
        const diff = differenceInSeconds(end, now);
        if (diff > 0 && diff <= 48 * 3600) {
          setLabel(`마감까지 ${formatSecondsToHHMMSS(diff)} 남음`);
        } else {
          setLabel(null);
        }
        return;
      }

      if (status === "오픈_예정") {
        const diff = differenceInSeconds(start, now);
        if (diff > 0 && diff <= 48 * 3600) {
          const days = Math.floor(diff / (3600 * 24));
          const time = formatSecondsToHHMMSS(diff % (3600 * 24));
          setLabel(`D-${days} ${time} 남음`);
        } else if (diff > 48 * 3600) {
          const date = format(ticketingStartDate, "MM.dd(E)", { locale: ko });
          setLabel(`${date} 티켓 오픈 예정`);
        } else {
          setLabel(null);
        }
        return;
      }

      setLabel(null);
    };

    compute();
    const id = setInterval(compute, 1000);
    return () => clearInterval(id);
  }, [status, ticketingStartDate, ticketingEndDate]);

  return label;
}


