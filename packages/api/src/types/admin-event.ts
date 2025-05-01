export type AdminEventStatus = "검수 진행" | "검수 완료" | "행사 완료";

export type EventStatus = AdminEventStatus | "등록 완료" | "등록 취소";

interface AdminEventStatusInfo {
  value: string;
  text: AdminEventStatus | "검수 진행";
  color: string;
}

interface EventStatusInfo {
  value: string;
  text: EventStatus | "검수 진행";
  color: string;
}

export const ADMIN_EVENT_STATUS_INFO: AdminEventStatusInfo[] = [
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
    value: "행사 완료",
    text: "행사 완료",
    color: "#9981FE",
  },
];

export const EVENT_STATUS_INFO: EventStatusInfo[] = [
  ...ADMIN_EVENT_STATUS_INFO,
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
];

export type Content = {
  organizationId: number;
  organizationName: string;
  uketEventRegistrationId: number;
  eventName: string;
  eventType: string;
  eventStartDate: string;
  eventEndDate: string;
  ticketingStartDateTime: string;
  registrationStatus: string;
  isModifiable: boolean;
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

export interface ChangeEventStatusParams {
  uketEventRegistrationId: number;
  registrationStatus: string;
}

export type ChangeEventStatusResponse = ChangeEventStatusParams;
