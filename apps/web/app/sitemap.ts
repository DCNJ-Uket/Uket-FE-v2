import { fetcher } from "@uket/api/instance";
import { UketEventListResponse } from "@uket/api/types/univ";
import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: eventList } = await fetcher.get<UketEventListResponse>(
    `/uket-events?type=ALL`,
  );

  const events: MetadataRoute.Sitemap = eventList.items.map(event => ({
    url: `https://uket.co.kr/home/${event.eventName}/${event.id}`,
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 1,
  }));

  return [
    {
      url: "https://uket.co.kr",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://uket.co.kr/select-event",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://uket.co.kr/login",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://uket.co.kr/signup",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...events,
  ];
}
