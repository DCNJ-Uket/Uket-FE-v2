/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@ui/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";
import { CircleIcon, MinusIcon, PlusIcon } from "@ui/components/ui/icon";
import { Input } from "@ui/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@ui/components/ui/radio-group";
import {
  Control,
  FieldValues,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

interface PurchaseLimitFieldProps {
  control: Control<FieldValues, any>;
  onSetValue: UseFormSetValue<FieldValues>;
}

export default function PurchaseLimitField({
  control,
  onSetValue,
}: PurchaseLimitFieldProps) {
  const isFreeOption = useWatch({
    control,
    name: "paymentInfo.isFree",
  });

  return (
    <div className="flex items-end gap-4">
      <FormField
        control={control}
        name="paymentInfo.isFree"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2 shrink-0">
            <FormLabel className="text-[#8989A1] text-base font-normal">
              티켓 가격
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={value => {
                  field.onChange(value);
                  if (value === "무료")
                    onSetValue("paymentInfo.ticketPrice", 0);
                }}
                defaultValue={field.value}
                className="flex h-12"
              >
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <RadioGroupItem
                      value="무료"
                      isCircleVisible={false}
                      className="peer hidden"
                    />
                  </FormControl>
                  <FormLabel className="text-[#8989A1] text-base font-normal flex items-center gap-2 peer-aria-checked:[&>div>svg]:fill-brand peer-aria-checked:[&>div>span]:bg-[#C6B8FE] peer-data-[state=checked]:[&>div>svg]:fill-brand [&:has([data-state=checked])]:[&>div>svg]:fill-brand peer-aria-checked:[&>div>svg]:stroke-none">
                    <div className="relative">
                      <CircleIcon strokeWidth={1} />
                      <span className="absolute inset-0 rounded-full scale-50" />
                    </div>
                    <span>무료</span>
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <RadioGroupItem
                      value="유료"
                      isCircleVisible={false}
                      className="peer hidden"
                    />
                  </FormControl>
                  <FormLabel className="text-[#8989A1] text-base font-normal flex items-center gap-2 peer-aria-checked:[&>div>svg]:fill-brand peer-aria-checked:[&>div>span]:bg-[#C6B8FE] peer-data-[state=checked]:[&>div>svg]:fill-brand [&:has([data-state=checked])]:[&>div>svg]:fill-brand peer-aria-checked:[&>div>svg]:stroke-none">
                    <div className="relative">
                      <CircleIcon strokeWidth={1} />
                      <span className="absolute inset-0 rounded-full scale-50" />
                    </div>
                    <span>유료</span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="paymentInfo.ticketPrice"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2 w-full">
            <FormControl>
              <div className="w-full relative inline-flex items-center overflow-hidden border border-formInput rounded-md">
                <Button
                  type="button"
                  size={"icon"}
                  variant={"outline"}
                  className="hover:bg-gray-100 rounded-none border-none disabled:bg-[#f2f2f2]"
                  onClick={() => {
                    field.onChange(Number(field.value) - 100 || 100);
                  }}
                  disabled={field.value <= 100 || isFreeOption === "무료"}
                >
                  <MinusIcon size={12} aria-hidden="true" />
                </Button>
                <div className="relative grow">
                  <Input
                    type="number"
                    className="disabled:bg-[#f2f2f2] w-full peer pr-12 rounded-none border-t-0 border-b-0 border-formInput focus-visible:ring-offset-0 focus-visible:ring-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-0"
                    {...field}
                    min={100}
                    max={1000000}
                    step={100}
                    disabled={isFreeOption === "무료"}
                    value={field.value || 100}
                    onChange={e => {
                      const number = Number(e.target.value);

                      if (number < 100) {
                        field.onChange(100);
                      } else if (number > 1000000) {
                        field.onChange(1000000);
                      } else {
                        field.onChange(number);
                      }
                    }}
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
                    원
                  </span>
                </div>
                <Button
                  type="button"
                  size={"icon"}
                  variant={"outline"}
                  className="hover:bg-gray-100 rounded-none border-none border-l border-formInput disabled:bg-[#f2f2f2]"
                  onClick={() => {
                    field.onChange(Number(field.value) + 100 || 100);
                  }}
                  disabled={field.value >= 1000000 || isFreeOption === "무료"}
                >
                  <PlusIcon size={12} aria-hidden="true" />
                </Button>
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
