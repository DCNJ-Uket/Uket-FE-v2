import { Button } from "@ui/components/ui/button";
import { Calendar } from "@ui/components/ui/calendar";
import { CalendarIcon, ClockIcon } from "@ui/components/ui/icon";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";
import { ko } from "date-fns/locale";
import { useEventDate } from "../../../../hooks/use-event-date";

export default function EventCalendar() {
  const {
    startDate,
    eventDate,
    handleSelectEventDate,
    handleChangeEventTime,
    defaultEventDate,
    defaultEventTime,
  } = useEventDate();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="flex justify-start font-normal p-0 overflow-hidden bg-[#d9d9d9] border-formInput hover:bg-[#c3c3c3]"
        >
          <div className="text-[#5F6368] h-full flex justify-center items-center p-3">
            <CalendarIcon className="" />
          </div>
          <div className="text-[#8989A1] bg-white grow h-full flex items-center px-3 rounded-md">
            {defaultEventDate}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3 border-formInput" align="start">
        <div className="flex flex-col">
          <Calendar
            mode="single"
            selected={eventDate}
            onSelect={handleSelectEventDate}
            disabled={[{ before: startDate }]}
            classNames={{
              head_cell: `text-brand rounded-md w-9 font-normal text-[0.8rem]`,
              day_today: `bg-none`,
              day_selected: `bg-brand text-white`,
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-brand hover:text-white rounded-full",
            }}
            locale={ko}
          />
          <div className="border-t p-3">
            <div className="flex items-center gap-3">
              <Label htmlFor="time" className="text-xs">
                시간 선택
              </Label>
              <div className="relative grow">
                <Input
                  id="time"
                  type="time"
                  defaultValue={defaultEventTime}
                  className="peer appearance-none ps-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  onChange={handleChangeEventTime}
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <ClockIcon size={16} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
