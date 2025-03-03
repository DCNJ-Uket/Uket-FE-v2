/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation } from "@tanstack/react-query";

import { setTokenServer } from "@uket/util/cookie-server";
import { login } from "../auth";
import { getQueryClient } from "../get-query-client";
import { user } from "../queries/user";
import { AuthResponse, LoginRequestParams } from "../types/auth";

// TODO: 리다이렉트 처리
export const useMutationLogin = () => {
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: ({ code, provider }: LoginRequestParams) =>
      login({ code, provider }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: user.info().queryKey });
    },
    onSuccess: async ({
      accessToken,
      refreshToken,
      isRegistered,
    }: AuthResponse) => {
      await setTokenServer("user", "access", accessToken);
      await setTokenServer("user", "refresh", refreshToken);
      // await setAccessToken({ type: "user", token: accessToken });
      // await setRefreshToken({ type: "user", token: refreshToken });
      // if (isRegistered) {
      //   navigateTo("/", { replace: true });
      // } else {
      //   navigateTo("/signup", {
      //     state: { isUnRegistered: true },
      //     replace: true,
      //   });
      // }
    },
  });

  return mutation;
};
