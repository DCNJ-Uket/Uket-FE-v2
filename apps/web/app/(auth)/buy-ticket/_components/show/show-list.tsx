import { useQueryShowList } from "@uket/api/queries/reservation";
import ShowItem from "./show-item";

interface ShowListProps {
  eventId: string;
  selectedItem: number | null;
  onSelect: (id: number, name: string, startDate: string) => void;
}

export default function ShowList({
  eventId,
  selectedItem,
  onSelect,
}: ShowListProps) {
  const { data: shows } = useQueryShowList(Number(eventId));

  return (
    <div className="flex flex-col gap-4 px-[22px]">
      {shows.map(
        ({
          id,
          name,
          showDate,
          startTime,
          endTime,
          ticketingDate,
          totalTicketCount,
        }) => (
          <ShowItem
            key={id}
            name={name}
            showDate={showDate}
            startTime={startTime}
            endTime={endTime}
            ticketingDate={ticketingDate}
            totalTicketCount={totalTicketCount}
            isSelected={selectedItem === id}
            onSelect={() => onSelect(id, name, showDate)}
          />
        ),
      )}
    </div>
  );
}
