export type OptionType = {
  optionId: number;
  value: string;
};

export type SurveyFormType = {
  formId: number;
  isNecessary: boolean;
  formType: "TEXT" | "DROPDOWN";
  options: OptionType[];
  question: string;
  maxLength: number;
};

export type SurveyResponse = {
  surveyId: number;
  forms: SurveyFormType[];
};

export type SurveyRequestyFormType = {
  formId: number;
  response: string;
};

export type SurveyRequest = {
  surveyId: number;
  responses: SurveyRequestyFormType[];
};
