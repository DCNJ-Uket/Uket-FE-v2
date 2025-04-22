"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { useMutationSubmitSurvey } from "../../../packages/api/src/mutations/use-mutation-submit-survey";

export type FormSchemaType = z.infer<typeof SurveyRequestSchema>;
export type FormType = UseFormReturn<FormSchemaType, unknown, undefined>;

export const FormSchema = z.object({
  formId: z.number(),
  response: z.string(),
});

export const SurveyRequestSchema = z.object({
  surveyId: z.number(),
  responses: z.array(FormSchema),
});

export const useSurveyForm = () => {
  const { mutateAsync, isPending } = useMutationSubmitSurvey();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(SurveyRequestSchema),
    defaultValues: {
      surveyId: -1,
      responses: [],
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormSchemaType) => {
    const { surveyId, responses } = data;

    const response = await mutateAsync(
      { surveyId, responses },
      {
        onSuccess: data => {
          return data;
        },
      },
    );
    return response;
  };

  return {
    surveyForm: form,
    onSurveySubmit: onSubmit,
    isSurveyPending: isPending,
  };
};
