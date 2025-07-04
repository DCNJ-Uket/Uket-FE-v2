import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@uket/ui/components/ui/radio-group";
import { FormType } from "../../../../../hooks/use-event-booking-form";
import RadioItem from "./radio-item";

type Props = {
  form: FormType;
  selectedTime:
    | {
        timeLabel: string;
        entryGroupId: number;
        remaining: number;
      }
    | undefined;
  selectedRound:
    | {
        dateLabel: string;
        eventRoundId: number;
        times: {
          timeLabel: string;
          entryGroupId: number;
          remaining: number;
        }[];
      }
    | undefined;
  data: {
    dateLabel: string;
    eventRoundId: number;
    times: {
      timeLabel: string;
      entryGroupId: number;
      remaining: number;
    }[];
  }[];
  isOnlyOneDate: boolean;
  isOnlyOneTime: boolean;
};

export default function DateTimeSelectField({
  form,
  selectedRound,
  selectedTime,
  data,
  isOnlyOneDate,
  isOnlyOneTime,
}: Props) {
  const isUnderTenTickets = selectedTime && selectedTime.remaining <= 10;

  return (
    <section className="flex flex-col gap-6">
      <FormField
        control={form.control}
        name="eventRoundId"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-3">
            <FormLabel className="font-medium">날짜 선택</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-2 flex-wrap"
              >
                {data.map(({ dateLabel, eventRoundId }) => (
                  <FormItem key={eventRoundId}>
                    <FormControl>
                      <RadioGroupItem
                        key={eventRoundId}
                        isCircleVisible={false}
                        value={eventRoundId.toString()}
                      />
                    </FormControl>
                    <RadioItem
                      label={dateLabel}
                      isChecked={field.value === eventRoundId.toString()}
                      isOnlyOne={isOnlyOneDate}
                    />
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="entryGroupId"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-3">
            <FormLabel className="font-medium">시간 선택</FormLabel>
            {selectedRound && (
              <FormControl>
                <RadioGroup
                  onValueChange={value => {
                    field.onChange(value);
                    // Find the selected time to get its remaining count
                    const selectedEntry = selectedRound?.times.find(
                      t => t.entryGroupId.toString() === value,
                    );
                    if (selectedEntry) {
                      form.setValue("entryGroupId", value, {
                        shouldValidate: true,
                      });
                      form.setValue("remaining", selectedEntry.remaining, {
                        shouldValidate: true,
                      });
                    }
                  }}
                  defaultValue={field.value}
                  className="flex gap-2 flex-wrap"
                >
                  {selectedRound.times.map(
                    ({ timeLabel, entryGroupId, remaining }) => (
                      <FormItem key={entryGroupId}>
                        <FormControl>
                          <RadioGroupItem
                            key={entryGroupId}
                            isCircleVisible={false}
                            value={entryGroupId.toString()}
                          />
                        </FormControl>
                        <RadioItem
                          label={timeLabel}
                          isChecked={field.value === entryGroupId.toString()}
                          disabled={remaining === 0}
                          isOnlyOne={isOnlyOneTime}
                        />
                      </FormItem>
                    ),
                  )}
                </RadioGroup>
              </FormControl>
            )}
            {isUnderTenTickets && (
              <p className="mt-3 text-sm text-red-500">
                현재 잔여 티켓 {selectedTime.remaining}매
              </p>
            )}
          </FormItem>
        )}
      />
    </section>
  );
}
