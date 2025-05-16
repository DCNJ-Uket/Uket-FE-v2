import { HydrationBoundary } from "@uket/api";
import {
  UketEventListRequestParams,
  prefetchUketEventList,
} from "@uket/api/queries/uket-event";
import { Metadata } from "next";
import PrevNavButton from "../../../components/prev-nav-button";
import { Select_Event_Site_Config } from "../../../config/site";
import EventListSection from "./_components/event-list-section";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: Select_Event_Site_Config.title,
  description: Select_Event_Site_Config.description,
  openGraph: Select_Event_Site_Config.openGraph,
  twitter: Select_Event_Site_Config.twitter,
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const eventType =
    ((await searchParams).type as UketEventListRequestParams["type"]) || "ALL";
  
  const state = prefetchUketEventList({ type: eventType });

  return (
    <HydrationBoundary state={state}>
      <main className="w-full h-full relative flex flex-col items-center justify-evenly bg-[#F2F2F2]">
        <PrevNavButton />
        <main className="container mb-10 mt-7 flex h-full w-full flex-col gap-6 overflow-y-scroll px-4">
          <header className="text-[27px] font-black px-2">
            <p>행사 예매하기</p>
          </header>
          <EventListSection />
        </main>
      </main>
    </HydrationBoundary>
  );
}
