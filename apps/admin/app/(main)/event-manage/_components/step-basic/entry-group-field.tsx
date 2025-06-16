/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@ui/components/ui/button";
import { DateInput, TimeField } from "@ui/components/ui/datefield-rac";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";
import { CircleX, PlusCircleIcon } from "@ui/components/ui/icon";
import { Input } from "@ui/components/ui/input";
import { Control, FieldValues, useFieldArray, useWatch } from "react-hook-form";
import StepTooltip from "../step/step-tooltip";

interface EntryGroupFieldProps {
  control: Control<FieldValues, any>;
}

export default function EntryGroupField({ control }: EntryGroupFieldProps) {
  const { fields, append, remove } = useFieldArray({
    name: "entryGroup",
    control,
  });

  const totalTicketCount = useWatch({
    control,
    name: "totalTicketCount",
  });

  const calculateRemainingTickets = () => {
    if (!totalTicketCount) return 0;
    const total = fields.reduce((sum, field) => {
      const ticketCount = Number((field as any).ticketCount);
      return sum + (isNaN(ticketCount) ? 0 : ticketCount);
    }, 0);

    return totalTicketCount - total;
  };

  const handleAddGroup = () => {
    if (fields.length >= 6) return;

    const remainingTickets = calculateRemainingTickets();
    if (remainingTickets <= 0) return;

    append({
      ticketCount: undefined,
      entryStartTime: undefined,
      entryEndTime: undefined,
    });
  };

  return (
    <div className="grid w-full items-center gap-2">
      <FormLabel className="text-[#8989A1] text-base font-normal flex items-center gap-1">
        <span>입장 그룹 설정</span>
        <StepTooltip
          content={
            <p>
              입장 그룹 설정을 통해 공연 입장 시 사용자 입장 대기 시간을 줄일 수
              있습니다. 티켓 수량 별로 입장 시간을 다르게 설정할 수 있으니 참고
              바랍니다.
            </p>
          }
        />
      </FormLabel>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-flow-col grid-cols-3 gap-2 items-center"
        >
          <Input
            type="text"
            className="border-formInput"
            value={"그룹" + `${index + 1}`}
            disabled
          />
          <FormField
            key={`${field.id}.entryStartTime`}
            control={control}
            name={`entryGroup.${index}.entryStartTime`}
            render={({ field }) => (
              <FormItem>
                <TimeField
                  className="*:not-first:mt-2"
                  aria-label="Entry group time"
                  {...field}
                  value={field.value ?? { hour: 0, minute: 0 }}
                  defaultValue={{ hour: 0, minute: 0 }}
                  onChange={e => {
                    field.onChange({
                      hour: e?.hour,
                      minute: e?.minute,
                    });
                  }}
                >
                  <DateInput />
                </TimeField>
              </FormItem>
            )}
          />
          <FormField
            key={`${field.id}.ticketCount`}
            control={control}
            name={`entryGroup.${index}.ticketCount`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    className="border-formInput"
                    placeholder="100"
                    max={calculateRemainingTickets()}
                    {...field}
                    onChange={e => {
                      const number = Number(e.target.value);
                      const remaining = calculateRemainingTickets();

                      if (number > remaining) {
                        field.onChange(remaining);
                      } else if (number < 1) {
                        field.onChange(1);
                      } else {
                        field.onChange(number);
                      }
                    }}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
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
        </div>
      ))}
      <div className="text-center">
        <Button
          size={"icon"}
          variant="ghost"
          className="rounded-full hover:bg-[#f2f2f2]"
          onClick={handleAddGroup}
          disabled={fields.length >= 6 || calculateRemainingTickets() <= 0}
        >
          <PlusCircleIcon className="text-[#d9d9d9]" />
        </Button>
      </div>
    </div>
  );
}
