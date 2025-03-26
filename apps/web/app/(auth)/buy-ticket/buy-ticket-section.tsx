/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Form } from "@uket/ui/components/ui/form";
import dynamic from "next/dynamic";

import { useFunnel } from "@use-funnel/browser";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";
import { useBuyTicketForm } from "../../../hooks/use-buy-ticket-form";

const StepDate = dynamic(() => import("./_components/step/step-date"), {
  ssr: false,
});

const StepTime = dynamic(() => import("./_components/step/step-time"), {
  ssr: false,
});

const StepComplete = dynamic(() => import("./_components/step/step-complete"), {
  ssr: false,
});

const DateSchema = z
  .object({
    showId: z.string(),
    showDate: z.string(),
    ticketId: z.string(),
  })
  .partial();

const TimeSchema = DateSchema.required({ showId: true, showDate: true });
const CompleteSchema = TimeSchema.required({ ticketId: true });

export default function BuyTicketSection() {
  const { form, onSubmit } = useBuyTicketForm();
  const searchParams = useSearchParams();
  const router = useRouter();

  const eventName = searchParams.get("eventName");
  const eventId = searchParams.get("eventId");
  const hostId = searchParams.get("hostId");
  const routeUrl = `/home/${eventName}/${hostId}`;

  const funnel = useFunnel({
    id: "buy-ticket",
    steps: {
      Date: {
        parse: DateSchema.parse,
      },
      Time: {
        parse: TimeSchema.parse,
      },
      Complete: {
        parse: CompleteSchema.parse,
      },
    },
    initial: {
      step: "Date",
      context: {},
    },
  });

  // 새로 고침시에 초기 단계로 강제 이동
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const buyTicketStep = params.get("buy-ticket.step");

    if (buyTicketStep) {
      funnel.history.replace("Date");
    }
  }, []);

  return (
    <Form {...form}>
      <funnel.Render
        Date={({ history }) => (
          <StepDate
            eventName={eventName!}
            eventId={eventId!}
            onPrev={() => {
              router.replace(routeUrl);
            }}
            onNext={(showId: string, showDate: string) =>
              history.push("Time", {
                showId: showId,
                showDate: showDate,
              })
            }
          />
        )}
        Time={({ history, context }) => (
          <StepTime
            showDate={context.showDate}
            showId={context.showId}
            form={form}
            onSubmit={onSubmit}
            eventName={eventName!}
            onPrev={() => history.back()}
            onNext={(ticketId: string) =>
              history.replace("Complete", {
                ticketId: ticketId,
              })
            }
          />
        )}
        Complete={({ context }) => (
          <StepComplete
            ticketId={context.ticketId}
            eventId={eventId!}
            routeUrl={routeUrl}
          />
        )}
      />
    </Form>
  );
}
