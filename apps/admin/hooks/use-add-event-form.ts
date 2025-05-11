import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useMutationSubmitEvent } from "../../../packages/api/src/mutations/use-mutation-submit-event";

// 행사 등록 기본 스키마
export const BaseSchema = z
  .object({
    eventType: z.enum(["공연", "축제"]).default("공연"),
    organization: z.string(),
    organizationId: z.number(),
    eventName: z.string().min(1),
    eventRound: z.array(
      z.object({
        date: z.date(),
        startTime: z.string(),
      }),
    ),
    location: z.object({
      base: z.string().min(1),
      detail: z.string(),
    }),
    ticketingDate: z.object(
      {
        ticketingStartDateTime: z.date({
          message: "티켓 판매 기간을 설정해 주세요.",
        }),
        ticketingEndDateTime: z.date({
          message: "티켓 판매 기간을 설정해 주세요.",
        }),
      },
      {
        message: "티켓 판매 기간을 설정해 주세요.",
      },
    ),
    totalTicketCount: z
      .number({
        invalid_type_error: "티켓은 최소 1장 이상이어야 합니다.",
      })
      .min(1, {
        message: "티켓은 최소 1장 이상이어야 합니다.",
      }),
    details: z.object({
      information: z.string(),
      caution: z.string(),
    }),
    contact: z.object({
      type: z.string(),
      content: z.string().min(1),
      link: z.string().url().or(z.literal("")),
    }),
    uketEventImageId: z.object({
      file:
        typeof window === "undefined"
          ? z.any()
          : z.instanceof(File, {
              message: "이미지를 추가해 주세요.",
            }),
      previewImage: z.string().nullish(),
      id: z.string().nullish(),
    }),
    thumbnailImageId: z.object({
      file:
        typeof window === "undefined"
          ? z.any()
          : z.instanceof(File, {
              message: "이미지를 추가해 주세요.",
            }),
      previewImage: z.string().nullish(),
      id: z.string().nullish(),
    }),
    banners: z.array(
      z.object({
        file:
          typeof window === "undefined"
            ? z.any()
            : z.instanceof(File, {
                message: "이미지를 추가해 주세요.",
              }),
        previewImage: z.string().nullish(),
        link: z.string().url().or(z.literal("")),
        id: z.string().nullish(),
      }),
    ),
    paymentInfo: z.object({
      isFree: z.enum(["무료", "유료"]).default("무료"),
      ticketPrice: z.number().default(100),
      bankCode: z
        .string({
          message: "입금 은행을 선택해 주세요.",
        })
        .or(z.literal("")),
      accountNumber: z
        .string({
          message: "입금 계좌를 입력해 주세요",
        })
        .or(z.literal("")),
      depositorName: z
        .string({
          message: "예금주를 입력해 주세요",
        })
        .or(z.literal("")),
      depositUrl: z
        .string({
          message: "송금 코드 링크를 입력해 주세요",
        })
        .url({
          message: "형식에 맞지 않습니다.",
        })
        .or(z.literal("")),
    }),
  })
  .partial();

// 공연 정보 스키마
export const EventInfoSchema = BaseSchema.required({
  eventType: true,
  eventName: true,
  eventRound: true,
  ticketingDate: true,
  location: true,
  totalTicketCount: true,
});

// 입금 정보 스키마
export const PaymentSchema = EventInfoSchema.required({
  details: true,
  contact: true,
  uketEventImageId: true,
  thumbnailImageId: true,
  banners: true,
});

export const useAddEventForm = () => {
  const { mutateAsync } = useMutationSubmitEvent();

  const form = useForm<BaseSchemaType>({
    resolver: zodResolver(BaseSchema),
    mode: "onChange",
    defaultValues: {
      eventType: "공연",
      organization: "",
      organizationId: undefined,
      eventName: "",
      eventRound: [
        {
          date: undefined,
          startTime: undefined,
        },
      ],
      location: {
        base: "",
        detail: "",
      },
      ticketingDate: {
        ticketingStartDateTime: undefined,
        ticketingEndDateTime: undefined,
      },
      totalTicketCount: undefined,
      details: {
        information: "",
        caution: "",
      },
      contact: {
        type: "INSTAGRAM",
        content: "",
        link: "",
      },
      uketEventImageId: undefined,
      thumbnailImageId: undefined,
      banners: [
        {
          file: undefined,
          previewImage: undefined,
          link: "",
          id: undefined,
        },
      ],
      paymentInfo: {
        isFree: "무료",
        ticketPrice: 100,
        bankCode: undefined,
        accountNumber: undefined,
        depositorName: undefined,
        depositUrl: undefined,
      },
    },
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: BaseSchemaType) => {
    await mutateAsync(
      {
        params: {
          eventType: data.eventType!,
          organizationId: data.organizationId!,
          eventName: data.eventName!,
          location: data.location!,
          eventRound: data.eventRound!,
          ticketingDate: data.ticketingDate!,
          totalTicketCount: data.totalTicketCount!,
          details: data.details!,
          contact: data.contact!,
          uketEventImageId: data.uketEventImageId!,
          thumbnailImageId: data.thumbnailImageId!,
          banners: data.banners!,
          paymentInfo: data.paymentInfo!,
        },
      },
      {
        onSuccess: () => {
          redirect("/event-manage");
        },
      },
    );
  };

  return { form, onSubmit };
};

export type BaseSchemaType = z.infer<typeof BaseSchema>;
export type EventInfoSchemaType = z.infer<typeof EventInfoSchema>;
export type PaymentSchemaType = z.infer<typeof PaymentSchema>;
export type AddEventFormType = UseFormReturn<
  BaseSchemaType,
  unknown,
  undefined
>;
