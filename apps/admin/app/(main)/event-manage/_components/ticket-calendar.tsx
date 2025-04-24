import { Button } from "@ui/components/ui/button";
import { Calendar } from "@ui/components/ui/calendar";
import { CalendarIcon } from "@ui/components/ui/icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";
import { ScrollArea, ScrollBar } from "@ui/components/ui/scroll-area";
import { cn } from "@ui/lib/utils";
import { ko } from "date-fns/locale";
import { useTicketDate } from "../../../../hooks/use-ticket-date";

export default function TicketCalendar() {
  const {
    ticketTimeRange,
    timeRangeData,
    ticketDate,
    setTicketDate,
    defaultTicketDate,
    handleStartTime,
    handleEndTime,
  } = useTicketDate();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="flex justify-start font-normal hover:bg-[#c3c3c3] p-0 overflow-hidden bg-[#d9d9d9] border-formInput"
        >
          <div className="text-[#5F6368] h-full flex justify-center items-center p-3">
            <CalendarIcon className="" />
          </div>
          <div className="text-[#8989A1] bg-white grow h-full flex items-center px-3 rounded-md">
            {defaultTicketDate}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3 border-formInput" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={ticketDate?.from}
          selected={ticketDate}
          onSelect={setTicketDate}
          locale={ko}
          classNames={{
            head_cell: `text-brand rounded-md w-9 font-normal text-[0.8rem]`,
            day_today: `bg-none`,
            day_selected: `bg-brand text-white`,
            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-brand hover:text-white rounded-full",
          }}
        />
        <footer className="flex flex-col gap-1 px-5">
          <aside className="flex gap-5 items-center">
            <span className="font-bold">시작</span>
            <ScrollArea className="w-48 py-4 px-0">
              <div className="flex gap-2.5">
                {timeRangeData.map(time => (
                  <div key={time}>
                    <Button
                      size="sm"
                      variant={"outline"}
                      className={cn(
                        "text-[#8989A1] font-medium text-sm border-[#8989A1] h-8 w-14",
                        ticketTimeRange.startTime === time &&
                          "bg-brand text-white hover:bg-brandHover hover:text-white",
                      )}
                      onClick={() => handleStartTime(time)}
                    >
                      {time}
                    </Button>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </aside>
          <aside className="flex gap-5 items-center">
            <span className="font-bold">종료</span>
            <ScrollArea className="w-48 py-4 px-0">
              <div className="flex gap-2.5">
                {timeRangeData.map(time => (
                  <div key={time}>
                    <Button
                      size="sm"
                      variant={"outline"}
                      className={cn(
                        "text-[#8989A1] font-medium text-sm border-[#8989A1] h-8 w-14",
                        ticketTimeRange.endTime === time &&
                          "bg-brand text-white hover:bg-brandHover hover:text-white",
                      )}
                      onClick={() => handleEndTime(time)}
                    >
                      {time}
                    </Button>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </aside>
        </footer>
      </PopoverContent>
    </Popover>
  );
}
