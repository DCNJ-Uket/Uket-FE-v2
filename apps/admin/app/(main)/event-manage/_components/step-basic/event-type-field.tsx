/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@ui/components/ui/radio-group";
import { Control, FieldValues } from "react-hook-form";

interface EventTypeFieldProps {
  control: Control<FieldValues, any>;
}

export default function EventTypeField({ control }: EventTypeFieldProps) {
  return (
    <FormField
      control={control}
      name="eventType"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col items-center gap-4"
            >
              <FormItem className="w-full">
                <FormControl>
                  <RadioGroupItem
                    value="공연"
                    isCircleVisible={false}
                    className="peer hidden"
                  />
                </FormControl>
                <FormLabel className="cursor-pointer flex p-4 justify-center rounded-md border border-formInput text-[#BFBFBF] peer-aria-checked:bg-brand peer-data-[state=checked]:bg-brand [&:has([data-state=checked])]:bg-brand peer-aria-checked:text-white peer-aria-checked:border-none">
                  공연
                </FormLabel>
              </FormItem>
              <FormItem className="w-full">
                <FormControl>
                  <RadioGroupItem
                    value="축제"
                    isCircleVisible={false}
                    className="peer hidden"
                  />
                </FormControl>
                <FormLabel className="cursor-pointer flex p-4 justify-center rounded-md border border-formInput text-[#BFBFBF] peer-aria-checked:bg-brand peer-data-[state=checked]:bg-brand [&:has([data-state=checked])]:bg-brand peer-aria-checked:text-white peer-aria-checked:border-none">
                  축제
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
