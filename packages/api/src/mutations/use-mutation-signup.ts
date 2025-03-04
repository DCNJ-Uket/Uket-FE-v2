import { useMutation } from "@tanstack/react-query";

import { deleteCookie } from "@uket/util/cookie-client";
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
    onMutate: () => {
      deleteCookie("isRegistered");
    },
  });

  return mutation;
};
