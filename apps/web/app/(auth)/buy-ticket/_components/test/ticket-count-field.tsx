import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";
import { FormType } from "../../../../../hooks/use-event-booking-form";

interface TicketCountFieldProps {
  form: FormType;
  eventName: string;
  isSelected: boolean;
  label: string | undefined;
  remaining: number | undefined;
  price: number | undefined;
  maxLimit: number | undefined;
}

export default function TicketCountField({
  form,
  eventName,
  isSelected,
  label,
  remaining,
  price,
  maxLimit,
}: TicketCountFieldProps) {
  return (
    <FormField
      control={form.control}
      name="buyCount"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-3">
          <FormLabel className="font-medium">수량 선택</FormLabel>
          {isSelected && remaining && remaining > 0 && (
            <FormControl>
              <div className="rounded-lg flex flex-col gap-2 p-3.5 bg-[#fafafa] border-[0.5px] border-[#f2f2f2]">
                <h3 className="font-medium">{eventName}</h3>
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex gap-2">
                    <span>일시</span>
                    <span className="text-brand">{label}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>가격</span>
                    <span>{price?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-5 rounded-sm py-1.5 px-3.5 bg-white border-[0.5px] border-[#cccccc] ml-auto">
                    <button
                      type="button"
                      onClick={() => field.onChange(field.value - 1)}
                      className="w-6 h-6 flex items-center justify-center disabled:opacity-50 text-base"
                      disabled={field.value <= 1}
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm">
                      {field.value}
                    </span>
                    <button
                      type="button"
                      onClick={() => field.onChange(field.value + 1)}
                      className="w-6 h-6 flex items-center justify-center disabled:opacity-50 text-base"
                      disabled={
                        remaining === undefined ||
                        field.value >= remaining ||
                        (maxLimit !== undefined && field.value >= maxLimit)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </FormControl>
          )}
        </FormItem>
      )}
    />
  );
}
