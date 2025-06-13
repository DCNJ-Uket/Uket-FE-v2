/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@ui/components/ui/button";
import { Form } from "@ui/components/ui/form";
import { Skeleton } from "@ui/components/ui/skeleton";
import { useQueryAdminEventInfoDetail } from "@uket/api/queries/admin-event-info";
import { useFunnel } from "@use-funnel/browser";
import dynamic from "next/dynamic";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  BaseSchema,
  EventInfoSchema,
  PaymentSchema,
  useAddEventForm,
} from "../../../../hooks/use-add-event-form";

interface EventAddSectionProps {
  eventId?: string;
}

const StepBasicInfo = dynamic(() => import("./step/step-basic-info"), {
  ssr: false,
  loading: () => (
    <Skeleton className="bg-neutral-200 w-full h-full rounded-xl" />
  ),
});

const StepEventInfo = dynamic(() => import("./step/step-event-info"), {
  ssr: false,
  loading: () => (
    <Skeleton className="bg-neutral-200 w-full h-full rounded-xl" />
  ),
});

const StepPaymentInfo = dynamic(() => import("./step/step-payment-info"), {
  ssr: false,
  loading: () => (
    <Skeleton className="bg-neutral-200 w-full h-full rounded-xl" />
  ),
});

export default function EventAddSection({ eventId }: EventAddSectionProps) {
  const { data } = useQueryAdminEventInfoDetail(eventId);
  const { form, onSubmit } = useAddEventForm({
    initialData: data?.data,
    eventId,
  });
  const searchParams = useSearchParams();

  const funnel = useFunnel({
    id: "event-add",
    steps: {
      기본정보: {
        parse: BaseSchema.parse,
      },
      행사정보: {
        parse: EventInfoSchema.parse,
      },
      입금정보: {
        parse: PaymentSchema.parse,
      },
    },
    initial: {
      step: "기본정보",
      context: {},
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const initialStep = params.get("event-add.step");

    if (initialStep) {
      funnel.history.replace("기본정보");
    }
  }, []);

  return (
    <section className="w-full h-3/4 rounded-lg flex relative">
      <Form {...form}>
        <aside className="absolute -top-16 right-0">
          <Button
            size={"lg"}
            className="border border-[#FD7250] bg-[#FFEBE6] text-[#FD7250] hover:bg-[#ffe6df] rounded-xl"
            onClick={() => redirect("/event-manage")}
          >
            나가기
          </Button>
        </aside>
        <funnel.Render
          기본정보={({ history }) => (
            <StepBasicInfo
              onNext={values => {
                history.push("행사정보", {
                  eventType: values.eventType,
                  eventName: values.eventName,
                  eventRound: values.eventRound,
                  ticketingDate: values.ticketingDate,
                  location: values.location,
                  totalTicketCount: values.totalTicketCount,
                  entryGroup: values.entryGroup,
                });
              }}
            />
          )}
          행사정보={({ history }) => (
            <StepEventInfo
              onPrev={() => history.back()}
              onNext={values => {
                history.push("입금정보", {
                  details: {
                    information: values.details.information,
                    caution: values.details.caution,
                  },
                  contact: {
                    type: values.contact.type,
                    content: values.contact.content,
                    link: values.contact.link,
                  },
                  uketEventImageId: values.uketEventImageId,
                  thumbnailImageId: values.thumbnailImageId,
                  banners: values.banners,
                });
              }}
            />
          )}
          입금정보={({ history, context }) => (
            <StepPaymentInfo
              form={form}
              onSubmit={onSubmit}
              onPrev={() => history.back()}
              onNext={() => {}}
              uketEventImage={context.uketEventImageId}
              thumbnailImage={context.thumbnailImageId}
              bannerImageList={context.banners}
              isModify={eventId !== undefined}
            />
          )}
        />
      </Form>
    </section>
  );
}
