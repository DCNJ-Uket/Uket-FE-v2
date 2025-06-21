/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@ui/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";
import { ChevronDown, ChevronUp, CircleIcon } from "@ui/components/ui/icon";
import { Input } from "@ui/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@ui/components/ui/radio-group";
import {
  Control,
  FieldValues,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

interface BuyTicketLimitFieldProps {
  control: Control<FieldValues, any>;
  onSetValue: UseFormSetValue<FieldValues>;
}

export default function BuyTicketLimitField({
  control,
  onSetValue,
}: BuyTicketLimitFieldProps) {
  const noLimitOption = useWatch({
    control,
    name: "noLimit",
  });

  return (
    <div className="flex items-end gap-4">
      <FormField
        control={control}
        name="noLimit"
        render={({field}) => (
          <FormItem className="flex flex-col gap-2 shrink-0">
            <FormControl>
              <RadioGroup
                onValueChange={value => {
                  field.onChange(value);
                  if (value === "제한 없음")
                    onSetValue("buyTicketLimit", 0);
                }}
                defaultValue={field.value}
                className="flex h-12"
              >
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <RadioGroupItem
                      value="제한"
                      isCircleVisible={false}
                      className="peer hidden"
                    />
                  </FormControl>
                  <FormLabel className="text-[#8989A1] text-base font-normal flex items-center gap-2 peer-aria-checked:[&>div>svg]:fill-brand peer-aria-checked:[&>div>span]:bg-[#C6B8FE] peer-data-[state=checked]:[&>div>svg]:fill-brand [&:has([data-state=checked])]:[&>div>svg]:fill-brand peer-aria-checked:[&>div>svg]:stroke-none">
                    <div className="relative">
                      <CircleIcon strokeWidth={1} />
                      <span className="absolute inset-0 rounded-full scale-50" />
                    </div>
                    <span>제한</span>
                  </FormLabel>
                </FormItem>

                <FormField
                  control={control}
                  name="buyTicketLimit"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 w-full">
                      <FormLabel className="text-[#8989A1] text-base font-normal">
                        1인 구매 가능 수량
                      </FormLabel>
                      <FormControl>
                        <div className="w-full relative inline-flex items-center overflow-hidden border border-formInput rounded-md">
                          <div className="relative grow">
                            <Input
                              type="number"
                              className="disabled:bg-[#f2f2f2] w-full peer pr-12 rounded-none border-t-0 border-b-0 border-formInput focus-visible:ring-offset-0 focus-visible:ring-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-0"
                              {...field}
                              min={1}
                              max={1000000}
                              step={1}
                              disabled={noLimitOption}
                              value={field.value || 1}
                              onChange={e => {
                                const number = Number(e.target.value);

                                if (number < 1) {
                                  field.onChange(1);
                                } else if (number > 1000000) {
                                  field.onChange(1000000);
                                } else {
                                  field.onChange(number);
                                }
                              }}
                            />
                          </div>
                          <div>
                            <Button
                              type="button"
                              size={"icon"}
                              variant={"outline"}
                              className="hover:bg-gray-100 rounded-none border-none disabled:bg-[#f2f2f2]"
                              onClick={() => {
                                field.onChange(Number(field.value) - 1 || 1);
                              }}
                              disabled={field.value <= 1 || noLimitOption}
                            >
                              <ChevronDown size={12} aria-hidden="true" />
                            </Button>
                            <Button
                              type="button"
                              size={"icon"}
                              variant={"outline"}
                              className="hover:bg-gray-100 rounded-none border-none border-l border-formInput disabled:bg-[#f2f2f2]"
                              onClick={() => {
                                field.onChange(Number(field.value) + 1 || 1);
                              }}
                              disabled={field.value >= 1000000 || noLimitOption}
                            >
                              <ChevronUp size={12} aria-hidden="true" />
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <RadioGroupItem
                      value="제한 없음"
                      isCircleVisible={false}
                      className="peer hidden"
                    />
                  </FormControl>
                  <FormLabel className="text-[#8989A1] text-base font-normal flex items-center gap-2 peer-aria-checked:[&>div>svg]:fill-brand peer-aria-checked:[&>div>span]:bg-[#C6B8FE] peer-data-[state=checked]:[&>div>svg]:fill-brand [&:has([data-state=checked])]:[&>div>svg]:fill-brand peer-aria-checked:[&>div>svg]:stroke-none">
                    <div className="relative">
                      <CircleIcon strokeWidth={1} />
                      <span className="absolute inset-0 rounded-full scale-50" />
                    </div>
                    <span>제한 없음</span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
