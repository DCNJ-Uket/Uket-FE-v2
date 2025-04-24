import { DateRange } from "@ui/components/ui/calendar";
import { format, isSameDay } from "date-fns";
import { useMemo, useState } from "react";

export const useTicketDate = () => {
  const timeRangeData = useMemo(() => {
    return ["12:00", "15:00", "17:00", "18:00", "19:00", "20:00", "00:00"];
  }, []);

  const [ticketDate, setTicketDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [ticketTimeRange, setTicketTimeRange] = useState({
    startTime: "12:00",
    endTime: "12:00",
  });

  const handleStartTime = (time: string) => {
    if (!ticketDate || !ticketDate.from || !ticketDate.to) return;

    // 종료 날짜와 동일하다면, 종료 시간보다 클 때 오류
    if (isSameDay(ticketDate.from, ticketDate.to)) {
      if (time >= ticketTimeRange.endTime) {
        return;
      }
    }
    // 종료 날짜와 다르다면, 오류 없음
    setTicketTimeRange(prev => ({
      ...prev,
      startTime: time,
    }));

    const startTime = time;
    const updatedStartDate = new Date(ticketDate.from);
    updatedStartDate.setHours(Number(startTime.split(":")[0]));
    updatedStartDate.setMinutes(Number(startTime.split(":")[1]));

    setTicketDate(prev => {
      return { ...prev!, from: updatedStartDate };
    });
  };

  const handleEndTime = (time: string) => {
    if (!ticketDate || !ticketDate.from || !ticketDate.to) return;
    // 시작 날짜와 동일하다면, 시작 시간보다 작을 때 오류
    if (isSameDay(ticketDate.from, ticketDate.to)) {
      if (time <= ticketTimeRange.startTime) {
        return;
      }
    }
    // 시작 날짜와 다르다면, 오류 없음
    setTicketTimeRange(prev => ({
      ...prev,
      endTime: time,
    }));

    const endTime = time;
    const updatedEndDate = new Date(ticketDate.to);
    updatedEndDate.setHours(Number(endTime.split(":")[0]));
    updatedEndDate.setMinutes(Number(endTime.split(":")[1]));
    setTicketDate(prev => {
      return { ...prev!, to: updatedEndDate };
    });
  };

  const defaultTicketDate = useMemo(() => {
    if (ticketDate?.from) {
      if (ticketDate?.to) {
        return `${format(ticketDate.from, "yy/MM/dd HH:mm")} ~ ${format(ticketDate.to, "yy/MM/dd HH:mm")}`;
      } else {
        return format(ticketDate.from, "yy/MM/dd HH:mm");
      }
    } else {
      return "YY/MM/DD 00:00 ~ YY/MM/DD 00:00";
    }
  }, [ticketDate]);

  return {
    ticketTimeRange,
    timeRangeData,
    ticketDate,
    setTicketDate,
    defaultTicketDate,
    handleStartTime,
    handleEndTime,
  };
};
