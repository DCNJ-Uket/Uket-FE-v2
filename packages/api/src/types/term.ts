export type Term = {
  termsId: number;
  name: string;
  type: "MANDATORY" | "OPTIONAL";
  link: string;
  isAgreed: boolean;
};

export type TermListResponse = {
  items: Term[];
};

export type TermAgreedParams = {
  termId: number;
  isAgreed: boolean;
};

export type TermAgreedResponse = {
  items: TermAgreedParams[];
};
