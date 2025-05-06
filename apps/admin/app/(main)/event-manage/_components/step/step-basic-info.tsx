import { Separator } from "@ui/components/ui/separator";
import { FieldValues, useFormContext, useWatch } from "react-hook-form";
import EventCalendarField from "../event-calendar-field";
import EventNameField from "../event-name-field";
import EventTypeField from "../event-type-field";
import TicketCalendarField from "../ticket-calendar-field";
import TicketCountField from "../ticket-count-field";
import ZipcodeField from "../zipcode-field";
import StepController from "./step-controller";

interface StepBasicInfoProps {
  onNext: (
    values: Pick<
      FieldValues,
      | "eventType"
      | "eventName"
      | "eventRound"
      | "ticketingDate"
      | "location"
      | "totalTicketCount"
    >,
  ) => void;
}

export default function StepBasicInfo({ onNext }: StepBasicInfoProps) {
  const { control, setValue, trigger, watch } = useFormContext();
  const eventType = useWatch({
    control,
    name: "eventType",
  });
  const allFieldValues = watch();

  const handleNext = async () => {
    const isValid = await trigger(
      [
        "eventType",
        "eventName",
        "ticketingDate",
        "location.base",
        "location.detail",
        "totalTicketCount",
      ],
      { shouldFocus: true },
    );

    if (!isValid) return;

    const selectedValues = {
      eventType: allFieldValues.eventType,
      eventName: allFieldValues.eventName,
      eventRound: allFieldValues.eventRound,
      ticketingDate: allFieldValues.ticketingDate,
      location: {
        base: allFieldValues.location.base,
        detail: allFieldValues.location?.detail,
      },
      totalTicketCount: allFieldValues.totalTicketCount,
    };

    onNext(selectedValues);
  };

  return (
    <main className="flex w-full flex-col gap-2">
      <section className="flex w-full bg-white shadow-sm p-11 grow rounded-lg">
        <aside className="w-44 flex flex-col gap-6 basis-1/6">
          <h3 className="text-[#17171C] font-bold text-xl">
            1. 어떤 행사인가요?
          </h3>
          <EventTypeField control={control} />
        </aside>
        <Separator orientation="vertical" className="mx-10 bg-[#BFBFBF]" />
        <aside className="flex flex-col gap-6 grow">
          <h3 className="text-[#17171C] font-bold text-xl">
            2. 기본 정보를 입력해 주세요.
          </h3>
          <section className="flex gap-9">
            <aside className="basis-1/2 flex flex-col gap-4">
              <EventNameField
                control={control}
                onSetValue={setValue}
                labelTitle={eventType === "축제" ? "축제명" : "공연명"}
              />
              <EventCalendarField
                control={control}
                labelTitle={eventType === "축제" ? "축제 일시" : "공연 일시"}
              />
            </aside>
            <aside className="basis-1/2 flex flex-col gap-4">
              <TicketCalendarField control={control} />
              <ZipcodeField control={control} onSetValue={setValue} />
              <TicketCountField control={control} />
            </aside>
          </section>
        </aside>
      </section>
      <StepController onNext={handleNext} isFirstStep />
    </main>
  );
}
