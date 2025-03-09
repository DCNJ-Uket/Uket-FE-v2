import { Separator } from "@ui/components/ui/separator";
import { HydrationBoundary } from "@uket/api";
import { fetcher } from "@uket/api/instance";
import { prefetchFestivalDetail } from "@uket/api/queries/festival";
import { FestivalInfoResponse } from "@uket/api/types/univ";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import EventSection from "./_components/event-section";

type Props = {
  params: Promise<{ event: string; id: string }>;
};

// TODO: description 및 images 설정
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id, event } = await params;

  const { data } = await fetcher.get<FestivalInfoResponse>(
    `/universities/${id}/event`,
  );

  const images =
    data.banners.map(banner => banner.url) || (await parent).openGraph?.images;

  return {
    title: `${data.name} | Uket`,
    description: ``,
    openGraph: {
      title: `${data.name} | Uket`,
      description: ``,
      images: [...images],
      siteName: `${data.name} | Uket`,
      url: `https://uket.site/home/${event}/${id}`,
    },
    twitter: {
      title: `${data.name} | Uket`,
      description: ``,
      images: [...images],
    },
  };
}

export default async function Page({ params }: Props) {
  const { event, id } = await params;

  if (!event || !id) {
    redirect("/404");
  }

  const { state, error } = await prefetchFestivalDetail(parseInt(id));

  if (error) {
    redirect("/404");
  }

  return (
    <HydrationBoundary state={state}>
      <main className="w-full h-full relative flex flex-col items-center">
        <Separator className="h-3 bg-[#F2F2F2]" />
        <main className="container mt-2 flex h-full w-full flex-col gap-3 bg-white">
          <header className="mb-5 pt-3 text-2xl font-bold">
            {decodeURIComponent(event)}
          </header>
          <EventSection />
        </main>
      </main>
    </HydrationBoundary>
  );
}
