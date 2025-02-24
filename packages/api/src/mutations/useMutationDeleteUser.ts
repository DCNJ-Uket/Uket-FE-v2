import { useMutation } from "@tanstack/react-query";

import { DeleteUserResponse } from "../types/user";
import { fetcher } from "../instance";

export const useMutationDeleteUser = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await fetcher.post<DeleteUserResponse>(
        "/users/delete",
        null,
        {
          mode: "TOAST_UI",
          errorContent: {
            title: "회원탈퇴 오류",
            description: "잠시 후 다시 시도해 주세요.",
          },
        },
      );

      return data;
    },
    onMutate: () => {
      return { mutationKey: "deleteUser" };
    },
  });

  return mutation;
};
