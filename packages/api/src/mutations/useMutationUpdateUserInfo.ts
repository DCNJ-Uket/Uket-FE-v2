import { useMutation } from "@tanstack/react-query";

import { UserInfoResponse, UserInfoUpdateRequest } from "../types/user";
import { fetcher } from "../instance";

export const useMutationUpdateUserInfo = () => {
  const mutation = useMutation({
    mutationFn: async (userInfo: UserInfoUpdateRequest) => {
      const { data } = await fetcher.patch<UserInfoResponse>(
        "/users/info",
        userInfo,
      );

      return data;
    },
  });

  return mutation;
};
