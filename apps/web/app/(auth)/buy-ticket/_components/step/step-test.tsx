/* eslint-disable react-hooks/exhaustive-deps */
import {
  useQueryPerformerList,
  useQueryReservationInfoList2,
} from "@uket/api/queries/reservation";
import { useEffect, useState } from "react";

import { Activity } from "@ui/components/ui/activity";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";
import { Separator } from "@ui/components/ui/separator";
import { TicketResponse } from "@uket/api/types/show";
import { useWatch } from "react-hook-form";
import {
  FormSchemaType,
  FormType,
} from "../../../../../hooks/use-event-booking-form";
import DateTimeSelectField from "../test/datetime-select-field";
import PerformerSheet from "../test/performer-sheet";
import TicketCountField from "../test/ticket-count-field";
import {
  StepControllerProps,
  StepNextController,
  StepPrevController,
} from "./step-controller";

interface Props extends StepControllerProps {
  eventName: string;
  eventId: string;
  form: FormType;
  onSubmit: (data: FormSchemaType) => Promise<TicketResponse>;
}

export default function StepTest({
  onNext,
  onPrev,
  eventName,
  eventId,
  form,
  onSubmit,
}: Props) {
  const { data: reservationInfo } = useQueryReservationInfoList2(
    Number(eventId),
  );

  const { data: performerList } = useQueryPerformerList(Number(eventId));
  const [open, setOpen] = useState(false);

  const eventRoundId = useWatch({
    control: form.control,
    name: "eventRoundId",
  });
  const entryGroupId = useWatch({
    control: form.control,
    name: "entryGroupId",
  });
  const buyCount = useWatch({
    control: form.control,
    name: "buyCount",
  });

  const selectedRound = reservationInfo.find(
    d => d.eventRoundId.toString() === eventRoundId,
  );

  const selectedTime = selectedRound?.times.find(
    t => t.entryGroupId.toString() === entryGroupId,
  );

  const isOnlyOneDate = reservationInfo.length === 1;
  const isOnlyOneTime = reservationInfo[0]?.times.length === 1;

  useEffect(() => {
    if (isOnlyOneDate) {
      form.setValue(
        "eventRoundId",
        reservationInfo[0]!.eventRoundId.toString(),
        {
          shouldValidate: true,
        },
      );
    }
    if (isOnlyOneDate && isOnlyOneTime) {
      form.setValue(
        "entryGroupId",
        reservationInfo[0]!.times[0]!.entryGroupId.toString(),
        {
          shouldValidate: true,
        },
      );
      form.setValue("remaining", reservationInfo[0]!.times[0]!.remaining, {
        shouldValidate: true,
      });
    }
  }, []);

  // 예매하기 버튼에 할당
  const handleNext = async () => {
    const data = await onSubmit(form.getValues());
    const isFree = data.totalPrice === 0;

    onNext(isFree, {
      ticketPrice: data.totalPrice,
      bankCode: data.bankCode,
      depositUrl: data.depositUrl,
    });
  };

  return (
    <Activity>
      <StepPrevController onPrev={onPrev} />
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
        className="flex flex-col py-3 px-4 justify-start gap-8 h-full grow overflow-y-scroll pt-2"
      >
        <h1 className="text-[21px] font-bold">{eventName}</h1>
        <DateTimeSelectField
          form={form}
          data={reservationInfo}
          selectedRound={selectedRound}
          selectedTime={selectedTime}
          isOnlyOneDate={isOnlyOneDate}
          isOnlyOneTime={isOnlyOneTime}
        />
        <Separator className="-mx-4 h-[2px] bg-[#f2f2f2]" />
        <FormField
          control={form.control}
          name="performer"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3">
              <FormLabel className="flex gap-2 items-center">
                <span className="font-medium">초대 지인</span>
                <span className="text-xs font-normal text-[#8989A1]">
                  *선택
                </span>
              </FormLabel>
              <FormControl>
                <div className="flex grow flex-col gap-2">
                  <Input
                    isIcon
                    value={field.value}
                    placeholder="초대한 지인 찾기"
                    onClick={() => setOpen(true)}
                    readOnly
                    className="text-slate-500 font-light py-2.5 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <PerformerSheet
                    isOpen={open}
                    onClose={() => setOpen(false)}
                    performerList={performerList!}
                    onSelectItem={performer => {
                      setOpen(false);
                      form.setValue("performer", performer);
                    }}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Separator className="-mx-4 h-[2px] bg-[#f2f2f2]" />
        <TicketCountField
          form={form}
          eventName={eventName}
          isSelected={!!selectedTime}
          label={selectedRound?.dateLabel + " " + selectedTime?.timeLabel}
          remaining={selectedTime?.remaining}
          price={selectedRound?.price}
          maxLimit={reservationInfo[0]?.ticketLimit}
        />
      </form>
      <div className="border-t-2 border-t-[#f2f2f2] flex justify-between p-7 font-bold text-base bg-white">
        <p>총 결제금액</p>
        <p className="text-brand">
          {selectedRound && buyCount && selectedTime
            ? (selectedRound.price * buyCount).toLocaleString()
            : 0}
          원
        </p>
      </div>
      <StepNextController
        onNext={handleNext}
        disabled={!form.formState.isValid}
      />
    </Activity>
  );
}
