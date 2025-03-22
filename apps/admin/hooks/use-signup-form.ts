"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

export type FormSchemaType = z.infer<typeof SignupFormSchema>;
export type FormType = UseFormReturn<FormSchemaType, unknown, undefined>;

const SignupFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: "유효하지 않은 이메일입니다." })
      .min(1, { message: "이메일을 입력해 주세요." }),
    password: z.string().min(1, { message: "비밀번호를 입력해 주세요." }),
    check_password: z
      .string()
      .min(1, { message: "비밀번호가 일치하지 않습니다." }),
  })
  .required();

export const useSignupForm = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      check_password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormSchemaType) => {
    const { email, password, check_password } = data;

    alert("회원가입 성공");
  };

  return {
    form,
    onSubmit,
  };
};
