/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";
import { CircleIcon } from "@ui/components/ui/icon";
import { Input } from "@ui/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@ui/components/ui/radio-group";
import {
  Control,
  FieldValues,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

interface PaymentTicketPriceFieldProps {
  control: Control<FieldValues, any>;
  onSetValue: UseFormSetValue<FieldValues>;
}

export default function PaymentTicketPriceField({
  control,
  onSetValue,
}: PaymentTicketPriceFieldProps) {
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
          <FormItem className="flex flex-col gap-2">
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
          <FormItem className="flex flex-col gap-2 grow">
            <FormControl>
              <div className="relative">
                <Input
                  type="number"
                  className="disabled:bg-[#f2f2f2] border-formInput peer pe-12"
                  disabled={isFreeOption === "무료"}
                  min={0}
                  max={100000}
                  {...field}
                  onChange={e => {
                    const number = Number(e.target.value);

                    if (number < 0) {
                      field.onChange(0);
                    } else if (number > 100000) {
                      field.onChange(100000);
                    } else {
                      field.onChange(number);
                    }
                  }}
                />
                <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                  원
                </span>
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
