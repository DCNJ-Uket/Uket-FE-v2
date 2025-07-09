/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Form } from "@uket/ui/components/ui/form";
import dynamic from "next/dynamic";

import { useFunnel } from "@use-funnel/browser";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";
import { useEventBookingForm } from "../../../hooks/use-event-booking-form";

const StepTest = dynamic(() => import("./_components/step/step-test"), {
  ssr: false,
});

const StepComplete = dynamic(
  () => import("./_components/step/test-step-complete"),
  {
    ssr: false,
  },
);

const StepCompleteFree = dynamic(
  () => import("./_components/step/step-complete-free"),
  {
    ssr: false,
  },
);

const SelectSchema = z
  .object({
    showId: z.string(),
    showDate: z.string(),
    showTime: z.string(),
    ticketId: z.string(),
  })
  .partial();

const TestSchema = z.object({});

const CompleteSchema = z.object({});

export default function BuyTicketSection() {
  const { form, onSubmit } = useEventBookingForm();
  const searchParams = useSearchParams();
  const router = useRouter();

  const eventName = searchParams.get("eventName");
  const eventId = searchParams.get("eventId");
  const organization = searchParams.get("organization");
  const routeUrl = `/home/${eventName}/${eventId}`;

  const funnel = useFunnel({
    id: "buy-ticket",
    steps: {
      Test: {
        parse: TestSchema.parse,
      },
      Complete: {
        parse: z.object({
          ticketPrice: z.number(),
          bankCode: z.string(),
          depositUrl: z.string(),
          organization: z.string().nullable(),
          accountNumber: z.string(),
          depositorName: z.string(),
        }).parse,
      },
      CompleteFree: {
        parse: CompleteSchema.parse,
      },
    },
    initial: {
      step: "Test",
      context: {},
    },
  });

  // 새로 고침시에 초기 단계로 강제 이동
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const buyTicketStep = params.get("buy-ticket.step");

    if (buyTicketStep) {
      funnel.history.replace("Test");
    }
  }, []);

  return (
    <Form {...form}>
      <funnel.Render
        Test={funnel.Render.with({
          events: {
            무료티켓: (_, { history }) => {
              history.push("CompleteFree");
            },
            유료티켓: (
              {
                ticketPrice,
                bankCode,
                depositUrl,
                organization,
                accountNumber,
                depositorName,
              }: {
                ticketPrice: number;
                bankCode: string;
                depositUrl: string;
                organization: string | null;
                accountNumber: string;
                depositorName: string;
              },
              { history },
            ) => {
              history.push("Complete", {
                ticketPrice,
                bankCode,
                depositUrl,
                organization,
                accountNumber,
                depositorName,
              });
            },
          },
          render({ context, dispatch }) {
            return (
              <StepTest
                eventName={eventName!}
                eventId={eventId!}
                form={form}
                onSubmit={onSubmit}
                onPrev={() => {
                  router.replace(routeUrl);
                }}
                onNext={(
                  isFree: boolean,
                  {
                    ticketPrice,
                    bankCode,
                    depositUrl,
                    accountNumber,
                    depositorName,
                  }: {
                    ticketPrice: number;
                    bankCode: string;
                    depositUrl: string;
                    accountNumber: string;
                    depositorName: string;
                  },
                ) => {
                  if (isFree) {
                    dispatch("무료티켓");
                  } else {
                    dispatch("유료티켓", {
                      ticketPrice,
                      bankCode,
                      depositUrl,
                      organization,
                      accountNumber,
                      depositorName,
                    });
                  }
                }}
              />
            );
          },
        })}
        Complete={({ context }) => (
          <StepComplete
            routeUrl={routeUrl}
            ticketPrice={context.ticketPrice}
            bankCode={context.bankCode}
            depositUrl={context.depositUrl}
            organization={context.organization}
            accountNumber={context.accountNumber}
            depositorName={context.depositorName}
          />
        )}
        CompleteFree={() => <StepCompleteFree />}
      />
    </Form>
  );
}
