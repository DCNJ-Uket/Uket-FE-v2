/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";
import { Control, FieldValues } from "react-hook-form";

interface TicketCountFieldProps {
  control: Control<FieldValues, any>;
}

export default function TicketCountField({ control }: TicketCountFieldProps) {
  return (
    <FormField
      control={control}
      name="totalTicketCount"
      render={({ field }) => (
        <FormItem className="grid w-full items-center gap-2">
          <FormLabel className="text-[#8989A1] text-base font-normal">
            티켓 총 수량
          </FormLabel>
          <FormControl>
            <Input
              type="number"
              className="border-formInput"
              placeholder="100"
              min={1}
              max={100000}
              {...field}
              value={field.value || ""}
              onChange={e => {
                const number = Number(e.target.value);

                if (number < 1) {
                  field.onChange(1);
                } else if (number > 100000) {
                  field.onChange(100000);
                } else {
                  field.onChange(number);
                }
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
