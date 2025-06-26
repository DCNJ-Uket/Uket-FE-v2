/* eslint-disable @typescript-eslint/no-unused-vars */
import { Badge } from "@ui/components/ui/badge";
import {
  UketEventListRequestParams,
  useQueryUketEventImageList,
  useQueryUketEventList,
} from "@uket/api/queries/uket-event";
import Image from "next/image";

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
    <main className="grid grow auto-rows-min grid-cols-2 items-start gap-3 md:grid-cols-2">
      {data.length > 0 ? (
        <>
          {data.map(
            (
              {
                eventId,
                eventName,
                eventThumbnailImageId,
                eventStartDate,
                eventEndDate,
                ticketingStartDate,
                ticketingEndDate,
                ticketingStatus,
                leftDate,
                eventDayLabel,
                eventDate,
              },
              index,
            ) => (
              <article
                key={eventId}
                className="flex flex-col gap-3 cursor-pointer hover:bg-[#e7e7e7] p-1.5 rounded-2xl transition-colors duration-150"
                onClick={() => onSelect(eventName, eventId)}
              >
                <div className="relative h-64 rounded-xl overflow-hidden">
                  {imageList.data[index] ? (
                    <Image
                      src={URL.createObjectURL(imageList.data[index])}
                      alt={eventName}
                      width={250}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-[250px] h-full bg-[#e7e7e7]"></div>
                  )}
                  {ticketingStatus === "티켓팅_종료" && (
                    <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full text-white bg-[#979797e2] text-xs font-bold">
                      구매 불가
                    </div>
                  )}
                </div>
                <div className="text-sm px-2">
                  <h3 className="font-bold font-buttonDisabled">{eventName}</h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="shrink-0">{eventDate}</span>
                    {eventDayLabel && (
                      <Badge
                        variant="outline"
                        className="bg-transparent border-brand text-brand px-2 py-1 h-5 mt-0.5 shrink-0 text-[10px]"
                      >
                        {eventDayLabel}
                      </Badge>
                    )}
                  </div>
                </div>
              </article>
            ),
          )}
        </>
      ) : (
        <div className="text-desc col-span-full text-center text-lg">
          현재 예매 가능한 행사가 없습니다!
        </div>
      )}
    </main>
  );
}
