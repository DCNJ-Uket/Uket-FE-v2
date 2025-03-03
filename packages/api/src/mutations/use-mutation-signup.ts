import { useMutation } from "@tanstack/react-query";

import { signup } from "../auth";

export const useMutationSignup = () => {
  const mutation = useMutation({
    mutationFn: ({
      userName,
      userPhone,
    }: {
      userName: string;
      userPhone: string;
    }) =>
      signup({
        userName,
        userPhone,
      }),
  });

  return mutation;
};
