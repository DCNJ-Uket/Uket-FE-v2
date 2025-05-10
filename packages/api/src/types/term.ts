export type Term = {
  termsId: number;
  name: string;
  type: "MANDATORY" | "OPTIONAL";
  link: string;
  documentId: number;
  documentNo: number;
  documentVersion: number;
  isAgreed: boolean;
};

export type TermListResponse = {
  items: Term[];
};

export type TermAgreedParams = Pick<
  Term,
  "isAgreed" | "documentId" | "type"
> & {
  termId: number;
};

export type TermAgreedResponse = {
  items: TermAgreedParams[];
};
