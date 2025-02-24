export interface LinkDetail {
  href: string;
  title: string;
}

export const NAV_LINK_LIST: LinkDetail[] = [
  {
    href: "/booking-manage",
    title: "예매 내역 관리",
  },
  {
    href: "/entrance-manage",
    title: "실시간 입장 조회",
  },
  {
    href: "/qr-scan",
    title: "QR 스캔",
  },
];
