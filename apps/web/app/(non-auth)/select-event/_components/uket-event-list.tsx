import { Badge } from "@ui/components/ui/badge";
import {
  UketEventListRequestParams,
  useQueryUketEventImageList,
  useQueryUketEventList,
} from "@uket/api/queries/uket-event";
import Image from "next/image";
import useTicketingLeftLabel from "../../../../hooks/use-ticketing-left-label";

interface UketEventListProps {
  onSelect: (name: string, id: number) => void;
  eventType: UketEventListRequestParams["type"];
}

export default function UketEventList({
  onSelect,
  eventType,
}: UketEventListProps) {
  const { data } = useQueryUketEventList({ type: eventType });
  const imageList = useQueryUketEventImageList(
    data.map(item => item.eventThumbnailImageId),
  );

  return (
    <main className="h-full">
      {data.length > 0 ? (
        <main className="grid grow auto-rows-min grid-cols-2 items-start gap-3 md:grid-cols-2">
          {data.map((item, index) => (
            <EventListItem
              key={item.eventId}
              item={item}
              imageBlob={imageList.data[index]}
              onSelect={onSelect}
            />
          ))}
        </main>
      ) : (
        <div className="flex flex-col gap-4 h-full items-center justify-center">
          <div className="relative">
            <Image
              src="/no-event.png"
              alt="행사 없음"
              width={60}
              height={150}
              className="h-full object-contain"
            />
          </div>
          <div className="text-[#8989A1] col-span-full text-center text-sm font-medium">
            현재 예매 가능한 행사가 없습니다!
          </div>
        </div>
      )}
    </main>
  );
}

function EventListItem({
  item,
  imageBlob,
  onSelect,
}: {
  item: ReturnType<typeof useQueryUketEventList>["data"][number];
  imageBlob: Blob | undefined;
  onSelect: (name: string, id: number) => void;
}) {
  const realtimeLeft = useTicketingLeftLabel(
    item.ticketingStatus,
    item.ticketingStartDate,
    item.ticketingEndDate,
  );

  return (
    <article
      className="flex flex-col gap-3 cursor-pointer hover:bg-[#e7e7e7] p-1.5 rounded-2xl transition-colors duration-150"
      onClick={() => onSelect(item.eventName, item.eventId)}
    >
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
        {imageBlob ? (
          <Image
            src={URL.createObjectURL(imageBlob)}
            alt={item.eventName}
            width={250}
            height={400}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-[250px] h-full bg-[#e7e7e7]"></div>
        )}
        {/* 남은 시간/오픈 예정 라벨: 이미지 하단 오버레이 */}
        {item.ticketingStatus !== "티켓팅_종료" &&
          (item.leftDate ?? realtimeLeft) && (
            <div
              className={`absolute bottom-0 left-0 w-full px-2 py-3 truncate text-center font-bold text-sm ${
                item.ticketingStatus === "티켓팅_진행중"
                  ? "bg-[#fed7cd] text-[#FB7350]"
                  : "bg-[#D6CDFE] text-[#724FFD]"
              }`}
            >
              {item.leftDate ?? realtimeLeft}
            </div>
          )}
        {item.ticketingStatus === "티켓팅_종료" && (
          <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full text-white bg-[#979797e2] text-xs font-bold">
            구매 불가
          </div>
        )}
      </div>
      <div className="text-sm px-2">
        <h3 className="font-bold font-buttonDisabled">{item.eventName}</h3>
        <div className="flex items-center gap-2 text-xs">
          <span className="shrink-0">{item.eventDate}</span>
          {item.eventDayLabel && (
            <Badge
              variant="outline"
              className="bg-transparent border-brand text-brand px-2 py-1 h-5 mt-0.5 shrink-0 text-[10px]"
            >
              {item.eventDayLabel}
            </Badge>
          )}
        </div>
      </div>
    </article>
  );
}
