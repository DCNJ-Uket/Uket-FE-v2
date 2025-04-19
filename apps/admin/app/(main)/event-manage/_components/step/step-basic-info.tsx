import { Button } from "@ui/components/ui/button";
import { Calendar, DateRange } from "@ui/components/ui/calendar";
import {
  ArrowRightIcon,
  CalendarIcon,
  CircleHelpIcon,
  PlusCircleIcon,
} from "@ui/components/ui/icon";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@ui/components/ui/radio-group";
import { Separator } from "@ui/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/components/ui/tooltip";
import { formatDate } from "@uket/util/time";
import { useState } from "react";

interface StepBasicInfoProps {
  onNext: () => void;
}

export default function StepBasicInfo({ onNext }: StepBasicInfoProps) {
  const [eventDate, setEventDate] = useState<Date>();
  const [ticketDate, setTicketDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  return (
    <main className="flex w-full flex-col gap-2">
      <section className="flex w-full bg-white shadow-sm p-11 grow rounded-lg">
        <aside className="w-44 flex flex-col gap-6 basis-1/6">
          <h3 className="text-[#17171C] font-bold text-xl">
            1. 어떤 행사인가요?
          </h3>
          <RadioGroup
            className="flex flex-col items-center gap-4"
            defaultValue="공연"
          >
            <div className="w-full">
              <RadioGroupItem
                value="공연"
                id="공연"
                isCircleVisible={false}
                className="peer hidden"
              />
              <Label
                htmlFor="공연"
                className="cursor-pointer flex p-4 justify-center rounded-md border border-formInput text-[#BFBFBF] peer-aria-checked:bg-brand peer-data-[state=checked]:bg-brand [&:has([data-state=checked])]:bg-brand peer-aria-checked:text-white peer-aria-checked:border-none"
              >
                공연
              </Label>
            </div>
            <div className="w-full">
              <RadioGroupItem
                value="축제"
                id="축제"
                isCircleVisible={false}
                className="peer hidden"
              />
              <Label
                htmlFor="축제"
                className="cursor-pointer flex p-4 justify-center rounded-md border border-formInput text-[#BFBFBF] peer-aria-checked:bg-brand peer-data-[state=checked]:bg-brand [&:has([data-state=checked])]:bg-brand peer-aria-checked:text-white peer-aria-checked:border-none"
              >
                축제
              </Label>
            </div>
          </RadioGroup>
        </aside>
        <Separator orientation="vertical" className="mx-10 bg-[#BFBFBF]" />
        <aside className="flex flex-col gap-6 grow">
          <h3 className="text-[#17171C] font-bold text-xl">
            2. 기본 정보를 입력해 주세요.
          </h3>
          <section className="flex gap-9">
            <aside className="basis-1/2 flex flex-col gap-4">
              <div className="grid w-full items-center gap-2">
                <Label
                  htmlFor="organization"
                  className="text-[#8989A1] text-base font-normal"
                >
                  주최명
                </Label>
                <Input
                  type="text"
                  id="organization"
                  disabled
                  className="disabled:bg-[#f2f2f2] border-formInput"
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label
                  htmlFor="eventName"
                  className="text-[#8989A1] text-base font-normal"
                >
                  공연명
                </Label>
                <Input
                  type="text"
                  id="eventName"
                  className="border-formInput"
                  placeholder="공연명"
                />
              </div>
              <div className="flex flex-col justify-center gap-2">
                <div className="grid w-full items-center gap-2">
                  <Label
                    htmlFor="eventDate"
                    className="text-[#8989A1] text-base font-normal"
                  >
                    공연일시
                  </Label>
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
                          {eventDate
                            ? formatDate(
                                eventDate.toDateString(),
                                "eventFormDate",
                              )
                            : "YY/MM/DD 00:00"}
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={eventDate}
                        onSelect={setEventDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex justify-center">
                  <Button
                    size={"icon"}
                    variant="ghost"
                    className="rounded-full hover:bg-[#f2f2f2]"
                  >
                    <PlusCircleIcon className="text-[#d9d9d9]" />
                  </Button>
                </div>
              </div>
            </aside>
            <aside className="basis-1/2 flex flex-col gap-4">
              <div className="grid w-full items-center gap-2">
                <Label
                  htmlFor="eventDate"
                  className="text-[#8989A1] text-base font-normal"
                >
                  티켓 판매 기간
                </Label>
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
                        {ticketDate?.from ? (
                          ticketDate.to ? (
                            <>
                              {formatDate(
                                ticketDate.from.toDateString(),
                                "eventFormDate",
                              )}{" "}
                              ~{" "}
                              {formatDate(
                                ticketDate.to.toDateString(),
                                "eventFormDate",
                              )}
                            </>
                          ) : (
                            formatDate(
                              ticketDate.from.toDateString(),
                              "eventFormDate",
                            )
                          )
                        ) : (
                          <span>YY/MM/DD 00:00 ~ YY/MM/DD 00:00</span>
                        )}
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={ticketDate?.from}
                      selected={ticketDate}
                      onSelect={setTicketDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid w-full items-center gap-2">
                <Label
                  htmlFor="eventLocation"
                  className="text-[#8989A1] text-base font-normal"
                >
                  위치
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="eventLocation"
                      className="flex hover:bg-[#c3c3c3] p-0 overflow-hidden bg-[#d9d9d9] border-formInput text-[#5f6368] text-center"
                    >
                      우편 번호 찾기
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="" align="start">
                    우편 번호 검색 창
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid w-full items-center gap-2">
                <Label
                  htmlFor="ticketCount"
                  className="text-[#8989A1] text-base font-normal"
                >
                  티켓 총 수량
                </Label>
                <Input
                  type="text"
                  id="ticketCount"
                  className="border-formInput"
                  placeholder="총 티켓 수 입력"
                />
              </div>
              <div className="flex flex-col justify-center gap-2">
                <div className="grid w-full items-center gap-2">
                  <Label
                    htmlFor="group"
                    className="text-[#8989A1] text-base font-normal flex items-center gap-1"
                  >
                    <span>입장 그룹 설정</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <CircleHelpIcon size={18} />
                        </TooltipTrigger>
                        <TooltipContent
                          className="bg-[#8989A1] text-white border-none max-w-xs p-3 rounded-xl font-normal"
                          side="top"
                          align="start"
                          sideOffset={12}
                        >
                          <p>
                            입장 그룹 설정을 통해 공연 입장 시 사용자 입장 대기
                            시간을 줄일 수 있습니다. 티켓 수량 별로 입장 시간을
                            다르게 설정할 수 있으니 참고 바랍니다.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="text"
                      className="border-formInput"
                      defaultValue="A(기본)"
                      disabled
                    />
                    <Input
                      type="text"
                      className="border-formInput"
                      placeholder="00:00"
                    />
                    <Input
                      type="text"
                      className="border-formInput"
                      placeholder="100"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <Button
                    size={"icon"}
                    variant="ghost"
                    className="rounded-full hover:bg-[#f2f2f2]"
                  >
                    <PlusCircleIcon className="text-[#d9d9d9]" />
                  </Button>
                </div>
              </div>
            </aside>
          </section>
        </aside>
      </section>
      <footer className="flex justify-end">
        <Button
          variant="ghost"
          className="hover:bg-gray-200 text-[#8989A1] flex gap-1"
          onClick={onNext}
        >
          다음으로
          <ArrowRightIcon size={16} strokeWidth={3} />
        </Button>
      </footer>
    </main>
  );
}
