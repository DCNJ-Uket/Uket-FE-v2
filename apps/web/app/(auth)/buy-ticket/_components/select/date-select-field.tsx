import DateTimeButton from "./datetime-button";

interface DateSelectFieldProps {
  dates: string[];
  selectedDate: string;
  onSelect: (date: string) => void;
}

export default function DateSelectField({
  dates,
  selectedDate,
  onSelect,
}: DateSelectFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium">날짜 선택</h3>
      <div className="flex gap-2 flex-wrap">
        {dates.map(date => (
          <div key={date} onClick={() => onSelect(date)}>
            <DateTimeButton
              isDate
              date={date}
              selected={selectedDate === date}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
