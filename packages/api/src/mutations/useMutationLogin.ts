import { useMutation } from "@tanstack/react-query";
import { navigateTo } from "@uket/util/globalNavigate";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@uket/util/token";

import { login } from "../auth";
import { getQueryClient } from "../get-query-client";
import { user } from "../queries/user";
import { AuthResponse, LoginRequestParams } from "../types/auth";

export const useMutationLogin = () => {
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: ({ code, provider }: LoginRequestParams) =>
      login({ code, provider }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: user.info().queryKey });
    },
    onSuccess: ({ accessToken, refreshToken, isRegistered }: AuthResponse) => {
      ACCESS_TOKEN.set(accessToken);
      REFRESH_TOKEN.set("refreshToken", refreshToken);

      if (isRegistered) {
        navigateTo("/", { replace: true });
      } else {
        navigateTo("/signup", {
          state: { isUnRegistered: true },
          replace: true,
        });
      }
    },
  });

  return mutation;
};
