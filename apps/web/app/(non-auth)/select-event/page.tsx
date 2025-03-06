import { HydrationBoundary } from "@uket/api";
import { prefetchFestivalList } from "@uket/api/queries/festival";
import { Metadata } from "next";
import { Select_Event_Site_Config } from "../../../config/site";
import EventListSection from "./_components/event-list-section";

export const metadata: Metadata = {
  title: Select_Event_Site_Config.title,
  description: Select_Event_Site_Config.description,
  openGraph: Select_Event_Site_Config.openGraph,
  twitter: Select_Event_Site_Config.twitter,
};


export default function Page() {
  const state = prefetchFestivalList();

  return (
    <HydrationBoundary state={state}>
      <main className="w-full h-full relative flex flex-col items-center justify-evenly bg-[#F2F2F2]">
        <main className="container mb-10 mt-7 flex h-full w-full flex-col gap-10 overflow-y-scroll">
          <header className="text-[27px] font-black">
            <p>원하는 공연을 찾아보세요.</p>
          </header>
          <EventListSection />
        </main>
      </main>
    </HydrationBoundary>
  );
}
