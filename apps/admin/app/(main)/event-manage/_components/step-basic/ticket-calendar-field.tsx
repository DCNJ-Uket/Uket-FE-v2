/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@ui/components/ui/button";
import { Calendar } from "@ui/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";
import { CalendarIcon } from "@ui/components/ui/icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";
import { ScrollArea, ScrollBar } from "@ui/components/ui/scroll-area";
import { cn } from "@ui/lib/utils";
import { format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { useMemo } from "react";
import { Control, FieldValues } from "react-hook-form";
import StepTooltip from "../step/step-tooltip";

interface TicketCalendarFieldProps {
  control: Control<FieldValues, any>;
  eventType: "축제" | "공연";
}

const timeRangeData = [
  "00:00",
  "12:00",
  "15:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

export default function TicketCalendarField({
  control,
  eventType,
}: TicketCalendarFieldProps) {
  const tooltipContent =
    eventType === "축제"
      ? "판매 기간은 가장 빠른 축제 날짜 이전에 마감 설정을 권장합니다. 마지막 축제일 기준으로 판매 기간 설정 시, 예매 불가한 티켓은 축제 일시 기준으로 자동 판매 종료됩니다. 축제 날짜별 판매 기간을 세부적으로 설정하려면 날짜별로 티켓을 따로 생성해 주세요."
      : "판매 기간은 가장 빠른 공연 날짜 이전에 마감 설정을 권장합니다. 마지막 공연일 기준으로 판매 기간 설정 시, 예매 불가한 티켓은 공연 일시 기준으로 자동 판매 종료됩니다. 공연 날짜별 판매 기간을 세부적으로 설정하려면 날짜별로 티켓을 따로 생성해 주세요.";

  return (
    <FormField
      control={control}
      name="ticketingDate"
      render={({ field }) => {
        const ticketDate = field.value;
        const defaultTicketDate = useMemo(() => {
          if (ticketDate?.ticketingStartDateTime) {
            if (ticketDate?.ticketingEndDateTime) {
              return `${format(ticketDate.ticketingStartDateTime, "yy/MM/dd HH:mm")} ~ ${format(ticketDate.ticketingEndDateTime, "yy/MM/dd HH:mm")}`;
            } else {
              return format(
                ticketDate.ticketingStartDateTime,
                "yy/MM/dd HH:mm",
              );
            }
          } else {
            return "YY/MM/DD 00:00 ~ YY/MM/DD 00:00";
          }
        }, [ticketDate]);

        return (
          <div className="flex flex-col gap-2">
            <FormItem className="grid w-full items-center">
              <FormLabel className="text-[#8989A1] text-base font-normal flex items-center gap-1">
                <span>티켓 판매 기간</span>
                <StepTooltip content={<p>{tooltipContent}</p>} />
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
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
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-3 border-formInput"
                  align="start"
                >
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={ticketDate?.ticketingStartDateTime}
                    selected={{
                      from: ticketDate?.ticketingStartDateTime,
                      to: ticketDate?.ticketingEndDateTime,
                    }}
                    onSelect={range => {
                      field.onChange({
                        ticketingStartDateTime: range?.from,
                        ticketingEndDateTime: range?.to,
                      });
                    }}
                    locale={ko}
                    classNames={{
                      head_cell: `text-brand rounded-md w-9 font-normal text-[0.8rem]`,
                      day_today: `bg-none`,
                      day_selected: `bg-brand text-white`,
                      day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-brand hover:text-white rounded-full",
                    }}
                    // disabled={date => date > new Date()}
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
                                  ticketDate?.ticketingStartDateTime?.getHours() ===
                                    Number(time.split(":")[0]) &&
                                    ticketDate?.ticketingStartDateTime?.getMinutes() ===
                                      Number(time.split(":")[1]) &&
                                    "bg-brand text-white hover:bg-brandHover hover:text-white",
                                )}
                                onClick={() => {
                                  if (!ticketDate?.ticketingStartDateTime)
                                    return;

                                  const updatedStartDate = new Date(
                                    ticketDate.ticketingStartDateTime,
                                  );
                                  updatedStartDate.setHours(
                                    Number(time.split(":")[0]),
                                  );
                                  updatedStartDate.setMinutes(
                                    Number(time.split(":")[1]),
                                  );

                                  // If dates are the same, check if end time is after start time
                                  if (
                                    ticketDate?.ticketingEndDateTime &&
                                    isSameDay(
                                      updatedStartDate,
                                      ticketDate.ticketingEndDateTime,
                                    )
                                  ) {
                                    if (
                                      time >=
                                      format(
                                        ticketDate.ticketingEndDateTime,
                                        "HH:mm",
                                      )
                                    ) {
                                      return;
                                    }
                                  }

                                  field.onChange({
                                    ...ticketDate,
                                    ticketingStartDateTime: updatedStartDate,
                                  });
                                }}
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
                                  ticketDate?.ticketingEndDateTime?.getHours() ===
                                    Number(time.split(":")[0]) &&
                                    ticketDate?.ticketingEndDateTime?.getMinutes() ===
                                      Number(time.split(":")[1]) &&
                                    "bg-brand text-white hover:bg-brandHover hover:text-white",
                                )}
                                onClick={() => {
                                  if (!ticketDate?.ticketingEndDateTime) return;

                                  const updatedEndDate = new Date(
                                    ticketDate.ticketingEndDateTime,
                                  );
                                  updatedEndDate.setHours(
                                    Number(time.split(":")[0]),
                                  );
                                  updatedEndDate.setMinutes(
                                    Number(time.split(":")[1]),
                                  );

                                  // If dates are the same, check if start time is before end time
                                  if (
                                    ticketDate?.ticketingStartDateTime &&
                                    isSameDay(
                                      updatedEndDate,
                                      ticketDate.ticketingStartDateTime,
                                    )
                                  ) {
                                    if (
                                      time <=
                                      format(
                                        ticketDate.ticketingStartDateTime,
                                        "HH:mm",
                                      )
                                    ) {
                                      return;
                                    }
                                  }

                                  field.onChange({
                                    ...ticketDate,
                                    ticketingEndDateTime: updatedEndDate,
                                  });
                                }}
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
            </FormItem>
          </div>
        );
      }}
    />
  );
}
