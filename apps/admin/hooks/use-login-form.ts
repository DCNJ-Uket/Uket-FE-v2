"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

import { useMutationAdminLogin } from "@uket/api/mutations/use-mutation-admin-login";
import { AdminLoginResponse } from "@uket/api/types/admin-auth";
import { setTokenServer } from "@uket/util/cookie-server";
import { useRouter } from "next/navigation";

export type FormSchemaType = z.infer<typeof LoginFormSchema>;
export type FormType = UseFormReturn<FormSchemaType, unknown, undefined>;

// TODO: 에러 메시지 정리
const LoginFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: "유효하지 않은 이메일입니다." })
      .min(1, { message: "이메일을 입력해 주세요." }),
    password: z.string().min(1, { message: "비밀번호를 입력해 주세요." }),
  })
  .required();

export const useLoginForm = () => {
  const { mutate, error } = useMutationAdminLogin();
  const router = useRouter();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormSchemaType) => {
    const { email, password } = data;

    mutate(
      {
        email,
        password,
      },
      {
        onSuccess: async ({ accessToken }: AdminLoginResponse) => {
          await setTokenServer("admin", "access", accessToken);
          router.push("/qr-scan");
        },
      },
    );
  };

  return {
    form,
    onSubmit,
    error: error
      ? error.response.data.message || "Unknwon Error has Occured"
      : null,
  };
};
