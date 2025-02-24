import { Geist, Noto_Sans_KR } from "next/font/google";

export const notoSans = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
});

export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})
