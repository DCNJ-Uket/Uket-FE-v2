import { TicketStatus } from "./ticket";

export enum TicketUserType {
  ALL = "TICKETING_ALL",
  STUDENT = "TICKETING_STUDENT",
}

export interface TicketUserOption {
  text: string;
  value: TicketUserType;
}

export const USER_TYPE: TicketUserOption[] = [
  { text: "일반인", value: TicketUserType.ALL },
  { text: "재학생", value: TicketUserType.STUDENT },
];

export interface TicketStatusInfo {
  value: string;
  text: TicketStatus | "예매 취소";
  color: string;
}

export const TICKET_STATUS_INFO: TicketStatusInfo[] = [
  {
    value: "BEFORE_PAYMENT",
    text: "입금 확인중",
    color: "rgba(255, 243, 130, 0.9)",
  },
  {
    value: "BEFORE_ENTER",
    text: "예매 완료",
    color: "rgba(129, 176, 254, 0.9)",
  },
  {
    value: "FINISH_ENTER",
    text: "입장 완료",
    color: "rgba(153, 129, 254, 0.9)",
  },
  { value: "EXPIRED", text: "기간 만료", color: "rgba(204, 204, 204, 0.9)" },
  {
    value: "REFUND_REQUESTED",
    text: "환불 요청",
    color: "rgba(153, 153, 153, 0.9)",
  },
  {
    value: "RESERVATION_CANCEL",
    text: "예매 취소",
    color: "rgba(253, 154, 129, 0.9)",
  },
];

export type TicketQrCodeRequestParams = Record<string, never>;

export interface TicketQrCodeResponse {
  ticketId: number;
  userId: number;
  userName: string;
  status: string;
  msg: string;
}

export interface FormAnswer {
  formId: number;
  answerId: number;
  question: string;
  answer: string;
}

export interface TicketResponse {
  ticketId: number;
  depositorName: string;
  telephone: string;
  showTime: string;
  orderDate: string;
  updatedDate: string;
  ticketStatus: string;
  friend: string;
}

export interface TicketListResponse {
  content: TicketResponse[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  empty: boolean;
}

export type SearchType =
  | "USER_NAME"
  | "PHONE_NUMBER"
  | "SHOW_DATE"
  | "RESERVATION_USER_TYPE"
  | "STATUS"
  | "NONE";

export interface SearchRequest {
  type: string;
  value: string;
}

export interface ChangeTicketParams {
  ticketId: number;
  status: string;
}

export type ChangeTicketResponse = ChangeTicketParams;
