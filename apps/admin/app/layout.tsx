import type { Metadata } from "next";

import { Toaster as Sonner } from "@uket/ui/components/ui/sonner";
import "@uket/ui/globals.css";

import { notoSans } from "../config/fonts";
import Providers from "./providers";

import GoogleAnalytics from "@uket/util/google-analytics";
import KakaoScript from "../utils/kakao";

export const metadata: Metadata = {
  title: "Uket for admin",
  description: "Uket 어드민을 위한 서비스입니다.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className}`}>
        <Providers>{children}</Providers>
        <Sonner richColors position="bottom-center" />
      </body>
      <KakaoScript />
      <GoogleAnalytics/>
    </html>
  );
}
