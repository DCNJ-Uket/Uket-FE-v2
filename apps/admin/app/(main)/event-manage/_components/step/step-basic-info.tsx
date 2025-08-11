import { Separator } from "@ui/components/ui/separator";
import { FieldValues, useFormContext, useWatch } from "react-hook-form";
import EntryGroupField from "../step-basic/entry-group-field";
import EventCalendarField from "../step-basic/event-calendar-field";
import EventNameField from "../step-basic/event-name-field";
import EventTypeField from "../step-basic/event-type-field";
import TicketCalendarField from "../step-basic/ticket-calendar-field";
import TicketCountField from "../step-basic/ticket-count-field";
import ZipcodeField from "../step-basic/zipcode-field";
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
      | "entryGroup"
    >,
  ) => void;
}

export default function StepBasicInfo({ onNext }: StepBasicInfoProps) {
  const { control, setValue, trigger, watch, formState, getFieldState } =
    useFormContext();
  const eventType = useWatch({
    control,
    name: "eventType",
  });
  const allFieldValues = watch();
  const hasBasicStepErrors =
    getFieldState("eventType", formState).invalid ||
    getFieldState("eventName", formState).invalid ||
    getFieldState("eventRound", formState).invalid ||
    getFieldState("ticketingDate", formState).invalid ||
    getFieldState("location.base", formState).invalid ||
    getFieldState("location.detail", formState).invalid ||
    getFieldState("totalTicketCount", formState).invalid ||
    getFieldState("entryGroup", formState).invalid;

  const handleNext = async () => {
    const isValid = await trigger(
      [
        "eventType",
        "eventName",
        "eventRound",
        "ticketingDate",
        "location.base",
        "location.detail",
        "totalTicketCount",
        "entryGroup",
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
      entryGroup: allFieldValues.entryGroup,
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
              <TicketCalendarField control={control} eventType={eventType} />
              <ZipcodeField control={control} onSetValue={setValue} />
              <TicketCountField control={control} />
              <EntryGroupField control={control} />
            </aside>
          </section>
        </aside>
      </section>
      <StepController
        onNext={handleNext}
        isFirstStep
        isNextDisabled={hasBasicStepErrors}
      />
    </main>
  );
}
