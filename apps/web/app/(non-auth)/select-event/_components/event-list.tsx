import { useQueryFestivalList } from "@uket/api/queries/festival";
import EventItem from "./event-item";

interface EventListProps {
  selectedEventId: number | null;
  onSelect: (id: number, name: string) => void;
}

export default function EventList({
  selectedEventId,
  onSelect,
}: EventListProps) {
  const { data } = useQueryFestivalList();

  return (
    <main className="grid grow auto-rows-min grid-cols-2 items-start gap-3 md:grid-cols-2">
      {data.length > 0 ? (
        <>
          {data.map(({ id, name, eventName, logoUrl }) => (
            <EventItem
              key={id}
              isSelected={selectedEventId === id}
              onSelect={() => onSelect(id, eventName)}
              logoUrl={logoUrl}
              name={name}
              eventName={eventName}
            />
          ))}
        </>
      ) : (
        <div className="text-desc col-span-full text-center text-lg">
          조회된 공연이 없습니다.
        </div>
      )}
    </main>
  );
}
