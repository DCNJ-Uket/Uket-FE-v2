import { zodResolver } from "@hookform/resolvers/zod";
import { getQueryClient } from "@uket/api/get-query-client";
import { useMutationBuyTicket } from "@uket/api/mutations/use-mutation-buy-ticket";
import { user } from "@uket/api/queries/user";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type FormSchemaType = z.infer<typeof bookingFormSchema>;
export type FormType = UseFormReturn<FormSchemaType, unknown, undefined>;

// Zod 스키마 정의
const bookingFormSchema = z.object({
  eventRoundId: z.string().min(1, "날짜를 선택해주세요"),
  entryGroupId: z.string().min(1, "시간을 선택해주세요"),
  remaining: z.number(),
  buyCount: z.number(),
  // .min(1, "최소 1매 이상 선택해주세요")
  // .max(10, "최대 10매까지 선택 가능합니다"),
  performer: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

// 개선된 커스텀 훅
export const useEventBookingForm = () => {
  const queryClient = getQueryClient();
  const { mutateAsync, isPending } = useMutationBuyTicket();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      eventRoundId: undefined,
      entryGroupId: undefined,
      remaining: undefined,
      buyCount: 1,
      performer: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormSchemaType) => {
    const { entryGroupId, buyCount, performer } = data;

    await mutateAsync(
      {
        entryGroupId: Number(entryGroupId),
        buyCount,
        performerName: performer || "",
      },
      {
        onSuccess: data => {
          queryClient.invalidateQueries({ queryKey: user.ticket().queryKey });
          return data;
        },
      },
    );
  };

  return { form, onSubmit, isPending };
};

// 타입 export
export { bookingFormSchema };
