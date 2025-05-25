export type EventStatus =
  | "검수 진행"
  | "검수 완료"
  | "행사 완료"
  | "등록 완료"
  | "등록 취소";

export interface EventStatusInfo {
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
    value: "행사 완료",
    text: "행사 완료",
    color: "#9981FE",
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

export interface AdminTicketDetail {
  eventName: string;
  location: string;
  eventRound: {
    date: Date;
    startTime: string;
  }[];
  ticketingStartDateTime: string;
  ticketingEndDateTime: string;
  entryGroup: {
    ticketCount: number;
    entryStartTime: string;
  }[];
  totalTicketCount: number;
  details: {
    information: string;
    caution: string;
  };
  contact: {
    type: string;
    content: string;
    link: string;
  };
  uketEventImageId: string;
  thumbnailImageId: string;
  banners: {
    imageId: number;
    link: string;
  }[];
  paymentInfo: {
    ticketPrice: number;
    bankCode: string;
    accountNumber: string;
    depositorName: string;
    depositUrl: string;
  };
}
export interface AdminTicketInfoResponse extends PaginationMeta {
  content: Content[];
}

export interface AdminTicketDetailInfoResponse {
  eventType: "FESTIVAL" | "PERFORMANCE";
  festivalData: AdminTicketDetail | null;
  performanceData: AdminTicketDetail | null;
}

export interface ChangeEventStatusParams {
  uketEventRegistrationId: number;
  registrationStatus: string;
}

export type ChangeEventStatusResponse = ChangeEventStatusParams;
