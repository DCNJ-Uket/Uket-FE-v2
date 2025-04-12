import { AdminSignupRequestParams } from "@uket/api/types/admin-auth";

import { useMutation } from "@tanstack/react-query";
import { adminSignup } from "../admin-auth";

export const useMutationAdminSignup = () => {
  const mutation = useMutation({
    mutationFn: ({
      email,
      password,
      token,
    }: AdminSignupRequestParams & { token: string }) =>
      adminSignup({ email, password, token }),
    throwOnError: false,
  });

  return mutation;
};
