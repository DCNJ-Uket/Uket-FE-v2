/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useQueryUketEventDetail } from "@uket/api/queries/uket-event";
import { useEffect } from "react";
import CarouselT from "./carousel/Carousel";
import KakaoMap from "./kakao-map";
import SectionItem from "./section-item";

interface EventDetailProps {
  eventId: string;
  onMount: (id: number) => void;
}

export default function EventDetail({ eventId, onMount }: EventDetailProps) {
  const { data } = useQueryUketEventDetail(parseInt(eventId));

  useEffect(() => {
    if (data) {
      onMount(data.id);
    }
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <SectionItem
        title="공연 정보 바로가기"
        item={<CarouselT slides={data.banners} />}
      />
      <SectionItem
        title="입장 위치"
        item={<KakaoMap location={data.location} />}
      />
    </div>
  );
}
