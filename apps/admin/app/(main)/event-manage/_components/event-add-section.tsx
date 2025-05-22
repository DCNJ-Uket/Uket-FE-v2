/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Form } from "@ui/components/ui/form";
import { useQueryAdminEventInfoDetail } from "@uket/api/queries/admin-event-info";
import { useFunnel } from "@use-funnel/browser";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
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
});

const StepEventInfo = dynamic(() => import("./step/step-event-info"), {
  ssr: false,
});

const StepPaymentInfo = dynamic(() => import("./step/step-payment-info"), {
  ssr: false,
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
    <section className="w-full h-3/4 rounded-lg flex">
      <Form {...form}>
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
            />
          )}
        />
      </Form>
    </section>
  );
}
