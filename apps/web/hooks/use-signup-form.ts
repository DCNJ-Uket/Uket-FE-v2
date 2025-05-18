"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getQueryClient } from "@uket/api/get-query-client";
import { useMutationSignup } from "@uket/api/mutations/use-mutation-signup";
import { user } from "@uket/api/queries/user";
import { deleteCookie, setToken } from "@uket/util/cookie-client";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { EXP } from "@uket/util/validate-form";

export const baseSchema = z
  .object({
    userType: z.enum(["no_univ"]).default("no_univ"),
    userName: z.string().regex(EXP.name, "이름을 정확하게 입력해주세요."),
    userPhone: z
      .string()
      .regex(EXP.phone, "휴대폰 번호를 정확하게 입력해주세요."),
  })
  .partial();

export const NameSchema = baseSchema.required({
  userType: true,
});

export const PhoneSchema = NameSchema.required({
  userName: true,
});

export const completeSchema = PhoneSchema.required({
  userPhone: true,
});

export const useSignupForm = () => {
  const queryClient = getQueryClient();
  const { mutateAsync } = useMutationSignup();

  const form = useForm<BaseSchema>({
    resolver: zodResolver(baseSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: BaseSchema) => {
    const { userName, userPhone } = data;

    await mutateAsync(
      {
        userName: userName!,
        userPhone: userPhone!,
      },
      {
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: user.info().queryKey });
        },
        onSuccess: ({ accessToken, refreshToken }) => {
          setToken("user", "access", accessToken);
          setToken("user", "refresh", refreshToken);
          deleteCookie("isRegistered");
          sessionStorage.removeItem("agreements");
        },
      },
    );
  };

  return { form, onSubmit };
};

export type BaseSchema = z.infer<typeof baseSchema>;
export type UserNameSchema = z.infer<typeof NameSchema>;
export type UserPhoneSchema = z.infer<typeof PhoneSchema>;
export type CompleteSchema = z.infer<typeof completeSchema>;
export type FormType = UseFormReturn<BaseSchema, unknown, undefined>;
