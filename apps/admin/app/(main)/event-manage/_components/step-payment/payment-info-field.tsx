/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";
import { Control, FieldValues } from "react-hook-form";
import { BANK_OPTION } from "../../../../../constants/bank-option";

interface PaymentInfoFieldProps {
  control: Control<FieldValues, any>;
  isDisabled: boolean;
}

export default function PaymentInfoField({
  control,
  isDisabled,
}: PaymentInfoFieldProps) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Label className="text-[#8989A1] text-base font-normal">
          입금 계좌
        </Label>
        <div className="flex">
          <FormField
            control={control}
            name="paymentInfo.bankCode"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isDisabled}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-s-md rounded-e-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-brand text-white hover:bg-brandHover hover:text-white w-32 gap-4">
                      <SelectValue placeholder="은행 선택" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BANK_OPTION.map(bank => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="paymentInfo.accountNumber"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 w-full">
                <FormControl>
                  <Input
                    className="border-formInput focus-visible:ring-0 focus-visible:ring-offset-0 rounded-s-none"
                    placeholder="입금 계좌정보 입력"
                    disabled={isDisabled}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <FormField
        control={control}
        name="paymentInfo.depositorName"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2">
            <FormLabel className="text-[#8989A1] text-base font-normal">
              예금주
            </FormLabel>
            <FormControl>
              <Input
                className="disabled:bg-[#f2f2f2] border-formInput"
                placeholder="예금주 입력"
                disabled={isDisabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
