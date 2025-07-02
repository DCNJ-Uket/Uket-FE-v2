import dayjs from "dayjs";
import "dayjs/locale/ko";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale("ko");

type FormatType =
  | "full"
  | "short"
  | "time"
  | "compact"
  | "fullCompact"
  | "shortCompact"
  | "fullTimeStamp"
  | "eventFormDate"
  | "userTicketDate"
  | "userTicketFullDate";

const tz = "Asia/Seoul";
const formatType: Record<FormatType, string> = {
  full: "YYYY년 MM월 DD일 (ddd)",
  short: "MM월 DD일 (ddd)",
  time: "HH:mm",
  fullCompact: "YY.MM.DD HH:mm",
  compact: "YYYY.MM.DD",
  shortCompact: "YY.MM.DD",
  fullTimeStamp: "YYYY-MM-DDTHH:mm:ss",
  eventFormDate: "YY/MM/DD HH:mm",
  userTicketDate: "MM.DD.(ddd)",
  userTicketFullDate: "MM.DD.(ddd) HH:mm",
};

export const formatTime = (hour: number, minute: number, second?: number) => {
  const hh = hour < 10 ? "0" + hour.toString() : hour.toString();
  const mm = minute < 10 ? "0" + minute.toString() : minute.toString();
  const ss = second
    ? second < 10
      ? "0" + second.toString()
      : second.toString()
    : "00";

  return hh + ":" + mm + ":" + ss;
};

export const formatDate = (date: string, type: FormatType) => {
  return dayjs(date)
    .utcOffset(0, true)
    .tz(tz)
    .format(formatType[type])
    .toString();
};
export * from "date-fns";
export { ko } from "date-fns/locale";
