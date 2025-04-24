import { addDays, format } from "date-fns";
import { useMemo, useState } from "react";

export const useEventDate = () => {
  const startDate = addDays(new Date(), 1);
  const [eventDate, setEventDate] = useState<Date | undefined>(startDate);

  const defaultEventDate = useMemo(() => {
    return eventDate ? format(eventDate, "yy/MM/dd HH:mm") : "";
  }, [eventDate]);
  const defaultEventTime = useMemo(() => {
    return eventDate ? format(eventDate, "HH:mm") : "";
  }, [eventDate]);

  const handleSelectEventDate = (date: Date | undefined) => {
    if (!date) return;

    const hours = eventDate ? eventDate.getHours() : 0;
    const minutes = eventDate ? eventDate.getMinutes() : 0;
    const updatedDate = new Date(date);
    updatedDate.setHours(hours);
    updatedDate.setMinutes(minutes);
    setEventDate(updatedDate);
  };

  const handleChangeEventTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(":").map(Number);
    if (!eventDate) return;

    const updatedDate = new Date(eventDate);
    updatedDate.setHours(hours!);
    updatedDate.setMinutes(minutes!);

    setEventDate(updatedDate);
  };

  return {
    startDate,
    eventDate,
    handleSelectEventDate,
    handleChangeEventTime,
    defaultEventDate,
    defaultEventTime,
  };
};
