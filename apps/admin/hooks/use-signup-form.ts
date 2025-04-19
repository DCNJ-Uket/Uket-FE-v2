"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { useMutationAdminSignup } from "../../../packages/api/src/mutations/use-mutation-admin-signup";

export type FormSchemaType = z.infer<typeof SignupFormSchema>;
export type FormType = UseFormReturn<FormSchemaType, unknown, undefined>;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:"<>?])[A-Za-z\d!@#$%^&*()_+{}:"<>?]{8,16}$/;

const SignupFormSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, {
        message:
          "비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.",
      })
      .max(16, {
        message:
          "비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.",
      })
      .regex(passwordRegex, {
        message:
          "비밀번호는 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.",
      }),
    check_password: z
      .string()
      .min(1, { message: "비밀번호 확인을 입력해주세요." }),
  })
  .refine(data => data.password === data.check_password, {
    message: "비밀번호가 일치하지 않습니다. 다시 입력해주세요.",
    path: ["check_password"],
  });

export const useSignupForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const { mutate, error } = useMutationAdminSignup();

  const router = useRouter();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: email,
      password: "",
      check_password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormSchemaType) => {
    const { email, password } = data;

    mutate(
      {
        email,
        password,
        token,
      },
      {
        onSuccess: () => {
          router.replace("/");
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
