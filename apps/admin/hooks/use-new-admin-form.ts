"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutationAddAdmin } from "@uket/api/mutations/use-mutation-manage-admin";
import { EXP } from "@uket/util/validate-form";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type NewAdminFormSchemaType = z.infer<typeof FormSchema>;
export type NewAdminFormType = UseFormReturn<
  NewAdminFormSchemaType,
  unknown,
  undefined
>;

const FormSchema = z.object({
  name: z
    .string({ required_error: "이름을 입력해 주세요." })
    .regex(EXP.name, "이름을 정확하게 입력해 주세요."),
  email: z
    .string({ required_error: "이메일을 입력해 주세요." })
    .email({ message: "이메일 형식에 맞게 입력해 주세요." }),
  organization: z.string({ required_error: "소속을 선택해 주세요." }),
  authority: z.string({ required_error: "권한을 선택해 주세요." }),
});

export const useNewAdminForm = () => {
  const { mutate } = useMutationAddAdmin();

  const form = useForm<NewAdminFormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: NewAdminFormSchemaType) {
    const { name, email, organization, authority } = data;
    mutate({ name, email, organization, authority }, {});
  }

  return { form, onSubmit };
};
