import { useQueryReservationList } from "@uket/api/queries/reservation";
import { Controller, useFormContext } from "react-hook-form";
import ReservationItem from "./reservation-item";

interface ReservationListProps {
  showId: string;
  onSelect: (startTime: string, endTime: string) => void;
}

export default function ReservationList({
  showId,
  onSelect,
}: ReservationListProps) {
  const { control } = useFormContext();
  const { data: reservationList } = useQueryReservationList(Number(showId));

  return (
    <Controller
      name="reservationId"
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-4 px-[22px]">
          {reservationList.map(
            ({
              id,
              startDate,
              startTime,
              endTime,
              reservedCount,
              totalCount,
            }) => (
              <ReservationItem
                key={id}
                startDate={startDate}
                startTime={startTime}
                endTime={endTime}
                reservedCount={reservedCount}
                totalCount={totalCount}
                isSelected={field.value === id}
                onSelect={() => {
                  field.onChange(id);
                  onSelect(startTime, endTime);
                }}
              />
            ),
          )}
        </div>
      )}
    />
  );
}
