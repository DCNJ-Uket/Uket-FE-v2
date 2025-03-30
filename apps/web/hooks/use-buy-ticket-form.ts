"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@uket/api";
import { useMutationBuyTicket } from "@uket/api/mutations/use-mutation-buy-ticket";
import { user } from "@uket/api/queries/user";
import { useSearchParams } from "next/navigation";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

export type FormSchemaType = z.infer<typeof FormSchema>;
export type FormType = UseFormReturn<FormSchemaType, unknown, undefined>;

export const FormSchema = z.object({
  universityId: z.number(),
  reservationId: z.number(),
});

// universityId는 hostId임.
export const useBuyTicketForm = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutationBuyTicket();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reservationId: -1,
      universityId: Number(useSearchParams().get("hostId")),
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormSchemaType) => {
    const { universityId, reservationId } = data;

    const response = await mutateAsync(
      { universityId, reservationId },
      {
        onSuccess: data => {
          queryClient.invalidateQueries({ queryKey: user.ticket().queryKey });
          return data;
        },
      },
    );
    return response.ticket.ticketId;
  };

  return { form, onSubmit, isPending };
};
