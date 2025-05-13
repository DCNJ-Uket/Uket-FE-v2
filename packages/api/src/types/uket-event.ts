export type UketEventDetail = {
  id: number;
  eventName: string;
  banners: {
    imageId: number;
    link: string;
  }[];
  information: string;
  caution: string;
  location: string;
  contactType: string;
  contactContent: string;
};

export type UketEventDetailResponse = UketEventDetail;

export type TicketingStatus = "티켓팅_진행중" | "오픈_예정" | "티켓팅_종료";

export type UketEventItem = {
  eventId: number;
  eventName: string;
  eventThumbnailImagePath: string;
  eventStartDate: string;
  eventEndDate: string;
  ticketingStartDate: string;
  ticketingEndDate: string;
  ticketingStatus: TicketingStatus;
};

export type UketEventListResponse = {
  events: UketEventItem[];
};
