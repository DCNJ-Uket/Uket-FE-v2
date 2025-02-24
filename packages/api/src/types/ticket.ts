export type TicketStatus = "입금 확인중" | "예매 완료" | "입장 완료" | "기간 만료";

export type TicketItem = {
  userName: string;
  showDate: string;
  enterStartTime: string;
  enterEndTime: string;
  showLocation: string;
  universityName: string;
  ticketStatus: TicketStatus;
  ticketNo: string;
  userType: string;
  showName: string;
  eventId: number;
  eventName: string;
  ticketId: number;
  createdAt: string;
  backgroundImageUrl: string;
};

export type QRCodeType = string;

export interface MyTicketListInfoResponse {
  items: TicketItem[];
}

export type MyTicketQRCodeResponse = QRCodeType;

export type CancelTicketResponse = {
  ticketId: number;
  ticketStatus: string;
};

export type DepositResponse = {
  accountNumber: string;
  accountOwner: string;
  depositUrl: string;
  ticketPrice: number;
};
