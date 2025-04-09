import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/select-event", "/login", '/home/*'],
      disallow: ["/buy-ticket", "/my-info", "/ticket-list", "/signup"],
    },
    sitemap: 'https://uket.co.kr/sitemap.xml'
  };
}
