// TODO: banners 필드 타입 변경 (현재 임시)
export type UketEventDetail = {
  eventId: number;
  eventName: string;
  eventType: string;
  firstRoundStartDateTime: string;
  lastRoundStartDateTime: string;
  information: string;
  detailImageId: string;
  banners: {
    imageId: number;
    link: string;
  }[];
  caution: string;
  organization: string;
  contact: {
    type: string;
    content: string;
    link: string;
  };
  location: string;
  ticketingStatus: TicketingStatus;
};

export type UketEventDetailResponse = UketEventDetail;

export type TicketingStatus = "티켓팅_진행중" | "오픈_예정" | "티켓팅_종료";

export type UketEventItem = {
  eventId: number;
  eventName: string;
  eventThumbnailImageId: string;
  eventStartDate: string;
  eventEndDate: string;
  ticketingStartDate: string;
  ticketingEndDate: string;
  ticketingStatus: TicketingStatus;
};

export type UketEventListResponse = {
  events: UketEventItem[];
};
