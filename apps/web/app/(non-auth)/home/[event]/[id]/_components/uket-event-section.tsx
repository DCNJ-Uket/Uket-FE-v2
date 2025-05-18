"use client";

import { Badge } from "@ui/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ui/components/ui/tabs";
import { cn } from "@ui/lib/utils";
import { useQueryUketEventDetail } from "@uket/api/queries/uket-event";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthRequiredModalButton from "../../../../../../components/auth-requried-modal-button";
import { handleClipboard } from "../../../../../../utils/clipboard";
import CarouselT from "./carousel/Carousel";
import KakaoMap from "./kakao-map";

interface UketEventSectionProps {
  eventId: number;
  eventName: string;
}

const TAB = [
  { value: "행사정보", title: "행사 정보" },
  { value: "장소", title: "장소" },
  { value: "환불규정", title: "환불 규정" },
];

const anotherInfo = [
  { label: "주최", value: "소리터" },
  {
    label: "문의",
    value: "@soritor_official",
    href: "https://www.instagram.com/official.uket/",
  },
  { label: "환불규정", value: "환불규정 바로가기", style: "link" },
  {
    label: "환불방법",
    value: "내 티켓 확인 > 예매 취소에서 직접 취소",
  },
];

export default function UketEventSection({
  eventId,
  eventName,
}: UketEventSectionProps) {
  const { data } = useQueryUketEventDetail(eventId);
  const router = useRouter();
  const [tab, setTab] = useState<"행사정보" | "장소" | "환불규정">("행사정보");

  // TODO: 기존에 쿼리 스트링으로 넘기던 hostId에 해당하는 id값이 API가 개편되면서 사라졌습니다.
  // TODO: eventId로 사용해야 합니다.
  const handleNavigateToTicketBuyRoute = () => {
    router.push(`/buy-ticket?eventName=${eventName}&eventId=${eventId}`);
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      <section className="mb-5 grow space-y-5">
        <header className="flex flex-col items-center gap-4 py-6">
          <h1 className="font-bold text-[27px]">{data.eventName}</h1>
          <div className="flex flex-col gap-2 items-center">
            <Badge
              variant={"outline"}
              className="border-brand text-brand px-3 py-1"
            >
              {data.eventType}
            </Badge>
            <span className="text-[#8989A1] text-sm">{data.eventDate}</span>
          </div>
        </header>
        <article className="relative">
          <Tabs
            defaultValue="행사정보"
            className="items-center"
            value={tab}
            onValueChange={(value: string) =>
              setTab(value as "행사정보" | "장소" | "환불규정")
            }
          >
            <TabsList className="h-auto rounded-none border-b-2 border-[#F2F2F2] p-0 w-full justify-around text-[#8989A1] sticky top-0 bg-white pt-3">
              {TAB.map(({ value, title }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="min-w-[6rem] data-[state=active]:after:bg-brand data-[state=active]:font-bold font-normal relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  {title}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent
              value="행사정보"
              className="w-full container py-6 px-6"
            >
              <main className="text-sm flex flex-col gap-6">
                <div className="space-y-2">
                  <h2 className="font-medium">공연소개</h2>
                  <h3 className="text-[#8989A1]">{data.information}</h3>
                </div>
                <div className="space-y-3">
                  <div className="h-[600px] my-3">
                    <Image
                      src={"/default-event-image.png"}
                      alt={eventName}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CarouselT slides={data.banners} />
                </div>
                <div className="space-y-2">
                  <h2 className="font-medium">주의사항</h2>
                  <ol className="text-[#8989A1] list-disc [&>li]:ml-5">
                    {data.caution.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ol>
                </div>
                <div className="space-y-2">
                  <div className="font-medium">판매정보</div>
                  <section className="flex flex-col gap-2 text-[#8989A1]">
                    {anotherInfo.map(({ label, value, href, style }, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="min-w-[4rem]">{label}</div>
                        {href ? (
                          <Link
                            href={href}
                            className="font-light"
                            target="_blank"
                          >
                            {value}
                          </Link>
                        ) : (
                          <div
                            className={cn(
                              "font-light",
                              style &&
                                "underline underline-offset-2 cursor-pointer",
                            )}
                            onClick={() => setTab("환불규정")}
                          >
                            {value}
                          </div>
                        )}
                      </div>
                    ))}
                  </section>
                </div>
              </main>
            </TabsContent>
            <TabsContent value="장소" className="w-full container py-6 px-6 ">
              <main className="flex flex-col gap-6 text-sm ">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">{data.location}</p>
                  <p className="text-[#8989A1] flex items-center gap-2">
                    <span>{data.location}</span>
                    <span
                      className="text-sm font-bold cursor-pointer text-brand underline"
                      onClick={() => handleClipboard(data.location)}
                    >
                      복사
                    </span>
                  </p>
                </div>
                <KakaoMap location={data.location} />
              </main>
            </TabsContent>
            <TabsContent
              value="환불규정"
              className="w-full container py-6 px-6"
            >
              <main className="text-sm flex flex-col gap-6 text-[#8989A1]">
                <div className="space-y-2">
                  <h2 className="font-medium text-black">환불 방법</h2>
                  <ol className="list-disc [&>li]:ml-5">
                    <li>{"내 티켓 확인 → 예매취소 버튼 클릭"}</li>
                    <li>{"환불/입금까지 최대 3영업일 소요"}</li>
                  </ol>
                </div>
                <div className="space-y-2">
                  <h2 className="font-medium text-black">주의 사항</h2>
                  <ol className="text-[#8989A1] list-disc [&>li]:ml-5">
                    {data.caution.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ol>
                </div>
                <div className="space-y-2">
                  <h2 className="font-medium text-black">취소 및 환불 안내</h2>
                  <ol className="list-disc [&>li]:ml-5">
                    <li>
                      {
                        "취소 마감 시간 이후 또는 관람일 당일 구매한 티켓은 취소/변경/환불이 불가합니다."
                      }
                    </li>
                    <li>
                      {
                        "날짜, 시간 변경이 필요한 경우 예매 취소 후 재예매가 필요합니다."
                      }
                    </li>
                  </ol>
                </div>
              </main>
            </TabsContent>
          </Tabs>
        </article>
      </section>
      <footer className="sticky bottom-0 z-10 flex w-full items-center justify-center gap-3 bg-white py-6 container">
        <AuthRequiredModalButton
          title="내 티켓 확인"
          path="/ticket-list"
          variant="brandsub"
        />
        <AuthRequiredModalButton
          title="예매하기"
          variant="brand"
          onClick={handleNavigateToTicketBuyRoute}
        />
      </footer>
    </div>
  );
}
