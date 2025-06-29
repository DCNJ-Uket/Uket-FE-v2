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

const StepSelect = dynamic(() => import("./_components/step/step-select"), {
  ssr: false,
});

const StepTest = dynamic(() => import("./_components/step/step-test"), {
  ssr: false,
});

const StepComplete = dynamic(
  () => import("./_components/step/test-step-complete"),
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
  const routeUrl = `/home/${eventName}/${eventId}`;
  const testData = {
    totalPrice: 15000,
    depositUrl: routeUrl,
    bankCode: "한국은행",
    accountNumber: "123456-78-9101112",
    accountOwner: "UKET",
  };

  const funnel = useFunnel({
    id: "buy-ticket",
    steps: {
      // Select: {
      //   parse: SelectSchema.parse,
      // },
      Test: {
        parse: TestSchema.parse,
      },
      Complete: {
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
        Test={({ history }) => (
          <StepTest
            eventName={eventName!}
            eventId={eventId!}
            form={form}
            onSubmit={onSubmit}
            onPrev={() => {
              router.replace(routeUrl);
            }}
            onNext={() => {
              history.push("Complete");
            }}
          />
        )}
        Complete={() => <StepComplete routeUrl={routeUrl} deposit={testData} />}
      />
    </Form>
  );
}
