import {
  TICKET_STATUS_INFO,
  TicketStatusInfo,
} from "@uket/api/types/admin-ticket";
import { TicketStatus } from "@uket/api/types/ticket";

const NEXT_STATUS_MAP: Record<TicketStatus, TicketStatus[]> = {
  "입금 확인중": ["예매 완료"],
  "예매 완료": ["입장 완료"],
  "입장 완료": [],
  "기간 만료": [],
  "환불 요청": ["예매 취소"],
  "예매 취소": [],
};

export const getNextTicketStatusOptions = (
  currentStatus: TicketStatus,
): TicketStatusInfo[] => {
  const currentItem = TICKET_STATUS_INFO.find(
    item => item.text === currentStatus,
  )!;

  const nextStatuses = NEXT_STATUS_MAP[currentStatus] || [];

  let options = TICKET_STATUS_INFO.filter(item =>
    nextStatuses.includes(item.text as TicketStatus),
  );

  if (!options.find(item => item.text === currentStatus)) {
    options = [currentItem, ...options];
  }

  return options;
};
