export type EventStatus =
  | "검수 진행"
  | "검수 완료"
  | "등록 완료"
  | "등록 취소"
  | "행사 완료";

interface EventStatusInfo {
  value: string;
  text: EventStatus | "검수 진행";
  color: string;
}

export const EVENT_STATUS_INFO: EventStatusInfo[] = [
  {
    value: "검수 진행",
    text: "검수 진행",
    color: "#A8FE83",
  },
  {
    value: "검수 완료",
    text: "검수 완료",
    color: "#FFF382",
  },
  {
    value: "등록 완료",
    text: "등록 완료",
    color: "#81B0FE",
  },
  {
    value: "등록 취소",
    text: "등록 취소",
    color: "#FD9A81",
  },
  {
    value: "행사 완료",
    text: "행사 완료",
    color: "#9981FE",
  },
];

export type Content = {
  organizationId: number;
  uketEventRegistrationId: number;
  eventName: string;
  organizationName: string;
  eventType: string;
  eventStartDate: string;
  eventEndDate: string;
  ticketingStartDateTime: string;
  registrationStatus: string;
};

export interface PaginationMeta {
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  empty: boolean;
}

export interface AdminTicketInfoResponse extends PaginationMeta {
  content: Content[];
}
