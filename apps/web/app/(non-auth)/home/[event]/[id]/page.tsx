import { Separator } from "@ui/components/ui/separator";
import { HydrationBoundary } from "@uket/api";
import { fetcher } from "@uket/api/instance";
import { prefetchUketEventDetail } from "@uket/api/queries/uket-event";
import { UketEventDetailResponse } from "@uket/api/types/uket-event";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import UketEventSection from "./_components/uket-event-section";

type Props = {
  params: Promise<{ event: string; id: string }>;
};

// TODO: 개편된 API에 맞게 설정
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id, event } = await params;

  const { data } = await fetcher.get<UketEventDetailResponse>(
    `/uket-events/${id}`,
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
      url: `https://uket.co.kr/home/${event}/${id}`,
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

  if (!event || !id || Number(id) === -1) {
    redirect("/404");
  }

  const { state, error } = await prefetchUketEventDetail(parseInt(id));

  if (error) {
    redirect("/404");
  }

  return (
    <HydrationBoundary state={state}>
      <main className="w-full h-full relative flex flex-col items-center">
        <Separator className="h-3 bg-[#F2F2F2]" />
        <main className="mt-2 flex h-full w-full flex-col gap-3 bg-white">
          <UketEventSection eventId={Number(id)} eventName={event} />
        </main>
      </main>
    </HydrationBoundary>
  );
}
