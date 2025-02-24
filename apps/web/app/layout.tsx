import "@uket/ui/globals.css";
import type { Metadata } from "next";

import Providers from "./providers";

import "@uket/ui/globals.css";

import { notoSans } from "../config/fonts";

export const metadata: Metadata = {
  title: "Uket",
  description: "Uket을 이용해 축제/공연을 웨이팅 없이 즐겨보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
