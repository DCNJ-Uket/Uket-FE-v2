import { useMutation } from "@tanstack/react-query";

import { fetcher } from "../instance";
import { DeleteUserResponse } from "../types/user";

export const useMutationDeleteUser = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await fetcher.post<DeleteUserResponse>(
        "/users/delete",
        null,
        {
          mode: "TOAST_UI",
          errorContent: {
            title: "회원 탈퇴 중 에러가 발생했어요.",
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
