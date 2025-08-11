/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@ui/components/ui/button";
import { Calendar } from "@ui/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";
import {
  CalendarIcon,
  CircleX,
  ClockIcon,
  PlusCircleIcon,
} from "@ui/components/ui/icon";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  Control,
  FieldValues,
  useFieldArray,
  useFormContext,
} from "react-hook-form";

interface EventCalendarFieldProps {
  control: Control<FieldValues, any>;
  labelTitle: string;
}

export default function EventCalendarField({
  control,
  labelTitle,
}: EventCalendarFieldProps) {
  const { fields, append, remove } = useFieldArray({
    name: "eventRound",
    control,
  });
  const { setValue } = useFormContext();

  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="flex flex-col gap-4">
        <FormLabel className="text-[#8989A1] text-base font-normal">
          {labelTitle}
        </FormLabel>
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={control}
            name={`eventRound.${index}.date`}
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <FormItem className="grid grid-flow-col grid-cols-3 gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className="w-full flex justify-start font-normal p-0 overflow-hidden bg-[#d9d9d9] border-formInput hover:bg-[#c3c3c3] col-span-full"
                        >
                          <div className="text-[#5F6368] h-full flex justify-center items-center p-3">
                            <CalendarIcon />
                          </div>
                          <div className="text-[#8989A1] bg-white grow h-full flex items-center px-3 rounded-md">
                            {field.value
                              ? format(field.value, "yy/MM/dd HH:mm")
                              : "YY/MM/DD 00:00"}
                          </div>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-3 border-formInput"
                      align="start"
                    >
                      <div className="flex flex-col">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={date => {
                            const hours = field.value?.getHours() || 0;
                            const minutes = field.value?.getMinutes() || 0;
                            const updatedDate = date!;
                            updatedDate.setHours(hours);
                            updatedDate.setMinutes(minutes);

                            // Update both date and startTime
                            field.onChange(updatedDate);
                            setValue(
                              `eventRound.${index}.startTime`,
                              format(updatedDate, "HH:mm:ss"),
                            );
                          }}
                          disabled={date => date < new Date()}
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
                                defaultValue={
                                  field.value
                                    ? format(field.value, "HH:mm")
                                    : ""
                                }
                                className="peer appearance-none ps-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none inline-block"
                                onChange={e => {
                                  const value = e.target.value;
                                  if (!field.value) return;

                                  // 값이 비워졌거나 부분 입력일 때는 안전하게 처리
                                  if (!value) {
                                    const resetDate = new Date(field.value);
                                    resetDate.setHours(0, 0, 0, 0);
                                    field.onChange(resetDate);
                                    setValue(
                                      `eventRound.${index}.startTime`,
                                      "00:00:00",
                                    );
                                    return;
                                  }

                                  const [hoursStr, minutesStr] = value.split(":");
                                  const hours = Number(hoursStr);
                                  const minutes = Number(minutesStr);

                                  // 숫자 변환 실패(부분 입력 등) 시 갱신 생략
                                  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
                                    return;
                                  }

                                  const updatedDate = new Date(field.value);
                                  updatedDate.setHours(hours);
                                  updatedDate.setMinutes(minutes);
                                  field.onChange(updatedDate);

                                  // Update startTime
                                  setValue(
                                    `eventRound.${index}.startTime`,
                                    format(updatedDate, "HH:mm:ss"),
                                  );
                                }}
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
                  {index > 0 ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full size-6 hover:bg-inherit"
                      onClick={() => remove(index)}
                    >
                      <CircleX stroke="white" fill="#d9d9d9" />
                    </Button>
                  ) : (
                    <div className="size-6" />
                  )}
                </FormItem>
              </div>
            )}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          size={"icon"}
          variant="ghost"
          className="rounded-full hover:bg-[#f2f2f2]"
          onClick={() =>
            append({
              date: null,
              startTime: "00:00:00",
            })
          }
          disabled={fields.length >= 5}
        >
          <PlusCircleIcon className="text-[#d9d9d9]" />
        </Button>
      </div>
    </div>
  );
}
