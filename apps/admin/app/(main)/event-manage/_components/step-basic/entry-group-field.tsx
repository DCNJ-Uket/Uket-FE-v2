"use client";

"use client";

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
import { Switch } from "@ui/components/ui/switch";
import { useState } from "react";
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

  const [checked, setChecked] = useState<boolean>(fields.length !== 0);

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
    if (fields.length >= 20) return;

    const remainingTickets = calculateRemainingTickets();
    if (remainingTickets <= 0) return;

    append({
      ticketCount: undefined,
      entryStartTime: {
        hour: 0,
        minute: 0,
      },
    });
  };

  const handleToggle = () => {
    if (checked) remove();
    else
      append({
        ticketCount: undefined,
        entryStartTime: {
          hour: 0,
          minute: 0,
        },
      });

    setChecked(checked => !checked);
  };

  return (
    <div className="grid w-full items-center gap-2">
      <EntryGroupLabel onHandleToggle={handleToggle} />
      {checked && (
        <>
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
                          field.onChange(number);
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
              disabled={fields.length >= 20 || calculateRemainingTickets() <= 0}
            >
              <PlusCircleIcon className="text-[#d9d9d9]" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function EntryGroupLabel({ onHandleToggle }: { onHandleToggle: () => void }) {
  const handleToggle = () => {
    onHandleToggle();
  };

  return (
    <FormLabel className="text-[#8989A1] text-base font-normal flex items-center gap-1">
      <span>입장 그룹 설정</span>
      <div className="h-5 w-10 mx-2 justify-between relative inline-grid grid-cols-[1fr_1fr] items-center text-xs font-medium">
        <Switch
          onCheckedChange={handleToggle}
          className="peer data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto rounded-full [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-full [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
        />
        <span className="invisible pointer-events-none relative flex items-center justify-center px-0.5 text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full">
          <span className="text-[6px] font-medium uppercase">Off</span>
        </span>
        <span className="peer-data-[state=checked]:text-background pointer-events-none relative me-0.5 flex items-center justify-center px-0.5 text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
          <span className="text-[8px] font-medium uppercase">On</span>
        </span>
      </div>
      <StepTooltip
        content={
          <p>
            입장 시간대를 나누어 혼잡 없이 입장 관리를 할 수 있습니다. 필요 시
            입장 시간(예: 18:30)과 해당 시간에 입장할 인원(예: 100명)을 설정해
            주세요. 참가자는 원하는 입장 시간대의 티켓을 선택하여 구매합니다.
          </p>
        }
      />
    </FormLabel>
  );
}
