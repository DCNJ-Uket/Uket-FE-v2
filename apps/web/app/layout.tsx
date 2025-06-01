import "@uket/ui/globals.css";
import type { Metadata } from "next";

import { Toaster as Sonner } from "@uket/ui/components/ui/sonner";
import Nav from "../components/nav";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { notoSans } from "../config/fonts";
import { Base_Site_Config } from "../config/site";

import GoogleAnalytics from "../config/google-analytics";
import Providers from "./providers";

export const metadata: Metadata = {
  title: Base_Site_Config.title,
  description: Base_Site_Config.description,
  authors: [{ name: "Uket Team", url: "https://github.com/DCNJ-Uket" }],
  generator: "Next.js",
  keywords: ["축제", "공연", "Uket", "유캣", "티켓팅", "티켓팅 서비스", "uket"],
  creator: "Uket FE",
  icons: [
    {
      url: "/favicon-16x16.png",
      sizes: "16x16",
      rel: "icon",
      type: "image/png",
    },
    {
      url: "/favicon-32x32.png",
      sizes: "32x32",
      rel: "icon",
      type: "image/png",
    },
    {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      rel: "icon",
      type: "image/png",
    },
    {
      url: "/android-chrome-192x192.png",
      sizes: "192x192",
      rel: "icon",
      type: "image/png",
    },
    {
      url: "/android-chrome-512x512.png",
      sizes: "512x512",
      rel: "icon",
      type: "image/png",
    },
  ],
  manifest: null,
  openGraph: Base_Site_Config.openGraph,
  twitter: Base_Site_Config.twitter,
  verification: {
    google: "Wmg92mVG9rJfROJ1uuXKS0RXHIekFV7YfzYuO79C780",
  },
};

// TODO: sitemap, dynamic routes metadata, robots.txt
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className}`}>
        <Providers>
          <main className="relative flex h-dvh w-screen flex-col items-center">
            <div className="relative flex h-full w-full flex-col sm:w-[500px]">
              <Nav />
              <main className="w-full grow">{children}</main>
            </div>
          </main>
        </Providers>
        <Sonner richColors position="bottom-center" duration={3000} />
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
