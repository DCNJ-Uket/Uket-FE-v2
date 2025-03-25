import { useQueryReservationList } from "@uket/api/queries/reservation";
import ReservationItem from "./reservation-item";

interface ReservationListProps {
  showId: string;
  selectedItem: number | null;
  onSelect: (id: number, startTime: string, endTime: string) => void;
}

export default function ReservationList({
  showId,
  selectedItem,
  onSelect,
}: ReservationListProps) {
  const { data: reservationList } = useQueryReservationList(Number(showId));

  return (
    <div className="flex flex-col gap-4 px-[22px]">
      {reservationList.map(
        ({ id, startDate, startTime, endTime, reservedCount, totalCount }) => (
          <ReservationItem
            key={id}
            startDate={startDate}
            startTime={startTime}
            endTime={endTime}
            reservedCount={reservedCount}
            totalCount={totalCount}
            isSelected={selectedItem === id}
            onSelect={() => onSelect(id, startTime, endTime)}
          />
        ),
      )}
    </div>
  );
}
