import type { Metadata } from "next";

import { Toaster as Sonner } from "@uket/ui/components/ui/sonner";
import "@uket/ui/globals.css";

import { notoSans } from "../config/fonts";
import Providers from "./providers";

import GoogleAnalytics from "@uket/util/google-analytics";

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
      <script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
        integrity="sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6"
        crossOrigin="anonymous"
        async
      ></script>
      <body className={`${notoSans.className}`}>
        <Providers>{children}</Providers>
        <Sonner richColors position="bottom-center" />
        <GoogleAnalytics/>
      </body>
    </html>
  );
}
