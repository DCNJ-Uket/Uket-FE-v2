/* eslint-disable @typescript-eslint/no-unused-vars */
import { Badge } from "@ui/components/ui/badge";
import {
  UketEventListRequestParams,
  useQueryFestivalList,
} from "@uket/api/queries/festival";
import Image from "next/image";

interface UketEventListProps {
  onSelect: (name: string, id: number) => void;
  eventType: UketEventListRequestParams["type"];
}

export default function UketEventList({
  onSelect,
  eventType,
}: UketEventListProps) {
  const { data } = useQueryFestivalList({ type: eventType });

  return (
    <main className="grid grow auto-rows-min grid-cols-2 items-start gap-4 md:grid-cols-2">
      {data.length > 0 ? (
        <>
          {data.map(
            ({
              eventId,
              eventName,
              eventThumbnailImagePath,
              eventStartDate,
              eventEndDate,
              ticketingStartDate,
              ticketingEndDate,
              ticketingStatus,
              leftDate,
              eventDayLabel,
              eventDate,
            }) => (
              // <UketEventCard
              //   key={eventId}
              //   eventId={eventId}
              //   eventName={eventName}
              //   eventThumbnailImagePath={eventThumbnailImagePath}
              //   eventStartDate={eventStartDate}
              //   eventEndDate={eventEndDate}
              //   ticketingStartDate={ticketingStartDate}
              //   ticketingEndDate={ticketingEndDate}
              //   ticketingStatus={ticketingStatus}
              //   leftDate={leftDate}
              //   eventDayLabel={eventDayLabel}
              //   eventDate={eventDate}
              // />
              <article
                key={eventId}
                className="flex flex-col gap-3 cursor-pointer"
                onClick={() => onSelect(eventName, eventId)}
              >
                <div className="relative h-66 rounded-2xl overflow-hidden">
                  <Image
                    src={"/default-event-image.png"}
                    alt={eventName}
                    width={250}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-sm px-2">
                  <h3 className="font-bold font-buttonDisabled">{eventName}</h3>
                  <div className="flex items-center gap-2">
                    <span>{eventDate}</span>
                    <Badge
                      variant="outline"
                      className="bg-transparent border-brand text-brand px-2 py-1 h-5 mt-1"
                    >
                      {"오늘"}
                    </Badge>
                  </div>
                </div>
              </article>
            ),
          )}
        </>
      ) : (
        <div className="text-desc col-span-full text-center text-lg">
          조회된 공연이 없습니다.
        </div>
      )}
    </main>
  );
}
