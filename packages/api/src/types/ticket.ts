export type TicketStatus =
  | "입금 확인중"
  | "예매 완료"
  | "입장 완료"
  | "기간 만료"
  | "환불 요청"
  | "예매 취소";

export type TicketItem = {
  userName: string;
  userId: number;
  ticketStatus: TicketStatus;
  ticketNo: string;
  ticketId: number;
  showDate: string;
  reserveAt: string;
  organizationName: string;
  location: string;
  isCancelable: boolean;
  eventName: string;
  uketEventId: number;
  entryGroupId: number;
  enterStartTime: string;
  enterStartDateTime: string;
  enterEndTime: string;
  createdAt: string;
  backgroundImageId: number;
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
  organizationId: number;
  depositLink: string;
  ticketPrice: number;
  account: {
    bankCode: string;
    accountNumber: string;
    depositorName: string;
  };
};

export type depositType = {
  totalPrice: number;
  depositUrl: string;
  bankCode: string;
  accountNumber: string;
  accountOwner: string;
};
