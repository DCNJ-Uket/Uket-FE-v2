type ValidateExp = "name" | "phone" | "email" | "type";
interface ValidationFunctionProps {
  type: ValidateExp;
  value: string;
}

export const EXP: Record<ValidateExp, RegExp> = {
  name: /^(?![ㄱ-ㅎㅏ-ㅣ]+$)([가-힣A-Za-z]{2,})$/,
  phone: /^01[0-9]\d{8}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  type: /^(univ|no_univ)$/,
};

export const validateForm = ({ type, value }: ValidationFunctionProps) => {
  return EXP[type].test(value);
};
