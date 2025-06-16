import DateTimeButton from "./datetime-button";

interface TimeSelectFieldProps {
  times: { date: string; remaining: number }[];
  selectedTime: string | null;
  onSelect: (date: string) => void;
}

export default function TimeSelectField({
  times,
  selectedTime,
  onSelect,
}: TimeSelectFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium">시간 선택</h3>
      <div className="flex gap-2 flex-wrap">
        {times.map(({ date, remaining }) => {
          const isDisabled = remaining === 0;
          return (
            <div key={date} onClick={() => !isDisabled && onSelect(date)}>
              <DateTimeButton
                isDate={false}
                date={date}
                selected={selectedTime === date}
                disabled={isDisabled}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
