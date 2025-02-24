export enum EntryTicketStatus {
  BEFORE_ENTER = "BEFORE_ENTER",
  FINISH_ENTER = "FINISH_ENTER",
  BEFORE_PAYMENT = "BEFORE_PAYMENT",
  RESERVATION_CANCEL = "RESERVATION_CANCEL",
  EXPIRED = "EXPIRED",
}

export interface Content {
  enterTime: string;
  name: string;
  ticketDate: string;
  phoneNumber: string;
  ticketStatus: EntryTicketStatus;
}

export interface PaginationMeta {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface EntryListResponse extends PaginationMeta {
  content: Content[];
}
