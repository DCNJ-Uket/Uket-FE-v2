export type FestivalInfo = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  banners: { title: string; url: string; redirectUrl: string }[];
};

export type FestivalInfoResponse = FestivalInfo;

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
