'use client';

import { z } from "zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EXP } from "../utils/validate-form";
import { useMutationSignup } from "@uket/api/mutations/use-mutation-signup";

export type FormSchemaType = z.infer<typeof FormSchema>;
export type FormType = UseFormReturn<FormSchemaType, unknown, undefined>;

export const FormSchema = z
  .object({
    userType: z.enum(["univ", "no_univ"], {
      required_error: "You need to select a notification type.",
    }),
    userName: z.string().regex(EXP.name),
    userPhone: z.string().regex(EXP.phone),
    userEmail: z.string().regex(EXP.email),
    userId: z.string(),
    userUniv: z
      .object({
        univName: z.string(),
        univId: z.number(),
      })
      ,
    userMajor: z.string(),
    userEmailAuth: z.string(),
  })
  .refine(data => {
    if (data.userType === "no_univ") return true;
    else {
      const { userEmail, userId, userUniv, userMajor, userEmailAuth } = data;
      if (
        userEmail === undefined ||
        userId === undefined ||
        userUniv === undefined ||
        userMajor === undefined ||
        userEmailAuth === undefined
      )
        return false;
    }
    return true;
  });

export const useStackForm = () => {
  const { mutateAsync } = useMutationSignup();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userName: "",
      userPhone: "",
      userUniv: {
        univName: "",
        univId: 0,
      },
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormSchemaType) => {
    const {
      userName,
      userPhone,
    } = data;

    await mutateAsync({
      userName,
      userPhone,
    });
  };

  return { form, onSubmit };
};
