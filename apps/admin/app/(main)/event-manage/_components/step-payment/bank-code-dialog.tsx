/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@ui/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@ui/components/ui/radio-group";
import { Control, FieldValues } from "react-hook-form";
import { BANK_OPTION } from "../../../../../constants/bank-option";

interface BankCodeDialogProps {
  open: boolean;
  onClose: () => void;
  control: Control<FieldValues, any>;
}

export default function BankCodeDialog({
  open,
  onClose,
  control,
}: BankCodeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose} modal={false}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>은행 선택</DialogTitle>
          <DialogDescription hidden />
        </DialogHeader>
        <FormLabel className="text-[#8989A1] text-base font-normal">
          입금 계좌
        </FormLabel>
        <div className="grid grid-cols-2 gap-4 py-4">
          <FormField
            control={control}
            name="paymentInfo.bankCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col items-center gap-4"
                  >
                    {BANK_OPTION.map(bank => (
                      <FormItem key={bank}>
                        <FormControl>
                          <RadioGroupItem
                            value={bank}
                            isCircleVisible={false}
                            className="peer hidden"
                          />
                        </FormControl>
                        <div className="cursor-pointer flex p-4 justify-center rounded-md border border-formInput text-[#BFBFBF] peer-aria-checked:bg-brand peer-data-[state=checked]:bg-brand [&:has([data-state=checked])]:bg-brand peer-aria-checked:text-white peer-aria-checked:border-none">
                          {bank}
                        </div>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onClose}>닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
