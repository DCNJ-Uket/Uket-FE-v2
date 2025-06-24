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
  phoneNumber: z
    .string({ required_error: "전화번호를 입력해 주세요." })
    .transform(val => {
      const cleaned = val.replace(/[^\d]/g, "");

      if (!cleaned.startsWith("010")) {
        return z.NEVER;
      }

      const formatted = `${cleaned.substring(0, 3)}-${cleaned.substring(3, 7)}-${cleaned.substring(7, 11)}`;

      const phoneRegex = /^010-\d{4}-\d{4}$/;
      if (!phoneRegex.test(formatted)) {
        return z.NEVER;
      }

      return formatted;
    })
    .refine(val => {
      if (!val) return true;
      const phoneRegex = /^010-\d{4}-\d{4}$/;
      return phoneRegex.test(val);
    }, "전화번호를 정확하게 입력해 주세요. (ex. 010-1234-5678)"),
  organization: z.string({ required_error: "소속을 선택해 주세요." }),
  authority: z.string({ required_error: "권한을 선택해 주세요." }),
});

export const useNewAdminForm = ({
  page,
  onClose,
}: {
  page: number;
  onClose: () => void;
}) => {
  const { mutate } = useMutationAddAdmin(page);
  
  const form = useForm<NewAdminFormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      organization: undefined,
      authority: undefined,
    },
    mode: "onChange",
  });

  function onSubmit(data: NewAdminFormSchemaType) {
    mutate(
      { ...data },
      {
        onSuccess: () => {
          onClose();
          form.reset();
        },
      },
    );
  }

  return { form, onSubmit };
};
