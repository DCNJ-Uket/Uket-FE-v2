import { useMutation } from "@tanstack/react-query";

import { fetcher } from "../instance";

type SurveyFormSchemaType = {
  surveyId: number;
  responses: {
    formId: number;
    response: string;
  }[];
};

export const useMutationSubmitSurvey = () => {
  const mutation = useMutation({
    mutationFn: async (surveyForm: SurveyFormSchemaType) => {
      const { data } = await fetcher.post("/survey", surveyForm);
      return data;
    },
  });

  return mutation;
};
