'use client';

import { z } from "zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { user } from "@uket/api/queries/user";
import { useQueryClient } from "@uket/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutationBuyTicket } from "@uket/api/mutations/use-mutation-buy-ticket";

export type FormSchemaType = z.infer<typeof FormSchema>;
export type FormType = UseFormReturn<FormSchemaType, unknown, undefined>;

export const FormSchema = z.object({
  universityId: z.number(),
  reservationId: z.number(),
});

export const useTicketStackForm = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutationBuyTicket();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reservationId: -1,
      universityId: -1,
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
    return response.ticket;
  };

  return { form, onSubmit, isPending };
};
