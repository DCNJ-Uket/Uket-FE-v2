import { useMutation } from "@tanstack/react-query";

import { setCookie, setToken } from "@uket/util/cookie-client";
import { useRouter } from "next/navigation";
import { login } from "../auth";
import { getQueryClient } from "../get-query-client";
import { user } from "../queries/user";
import { AuthResponse, LoginRequestParams } from "../types/auth";

export const useMutationLogin = () => {
  const queryClient = getQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ code, provider }: LoginRequestParams) =>
      login({ code, provider }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: user.info().queryKey });
    },
    onSuccess: ({ accessToken, refreshToken, isRegistered }: AuthResponse) => {
      setToken("user", "access", accessToken);
      setToken("user", "refresh", refreshToken);

      if (isRegistered) {
        router.replace("/");
      } else {
        setCookie("isRegistered", false);
        router.replace("/signup");
      }
    },
  });

  return mutation;
};
