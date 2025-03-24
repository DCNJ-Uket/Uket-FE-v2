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
    href: "#",
    title: "내 티켓 관리",
  },
  {
    href: "/qr-scan",
    title: "QR 스캔",
  },
];

export const SUPER_ADMIN_NAV_LINK_LIST: LinkDetail[] = [
  {
    href: "/super-admin/user-manage",
    title: "사용자 관리",
  },
  {
    href: "#",
    title: "티켓 정보 목록",
  },
];
