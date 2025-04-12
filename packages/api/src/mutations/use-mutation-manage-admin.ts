import { useMutation } from "@tanstack/react-query";
import { fetcherAdmin } from "../admin-instance";
import { getQueryClient } from "../get-query-client";
import { adminUser } from "../queries/admin-user";
import { AdminRemoveParams, AdminUserListResponse } from "../types/admin-user";

export const useMutationAddAdmin = () => {
  const mutation = useMutation({
    mutationKey: ["addAdmin"],
    mutationFn: async ({
      name,
      email,
      organization,
      authority,
    }: {
      name: string;
      email: string;
      organization: string;
      authority: string;
    }) => {
      const { data } = await fetcherAdmin.post("/users/register", {
        name,
        email,
        organization,
        authority,
      });

      return data;
    },
    onMutate: () => {
      return { mutationKey: "addAdmin" };
    },
  });

  return mutation;
};

export const useMutationRemoveAdmin = (page: number) => {
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationKey: ["removeAdmin"],
    mutationFn: async ({ adminId }: AdminRemoveParams) => {
      const { data } = await fetcherAdmin.delete(`/users/${adminId}`);

      return data;
    },
    onMutate: async ({ adminId }) => {
      const previousData = queryClient.getQueryData<AdminUserListResponse>([
        ...adminUser.list({ page }).queryKey,
        adminId,
      ]);

      await queryClient.cancelQueries({
        queryKey: adminUser.list({ page }).queryKey,
      });

      if (previousData) {
        queryClient.setQueryData<AdminUserListResponse>(
          [...adminUser.list({ page }).queryKey, adminId],
          { ...previousData },
        );
      }

      return { previousData, mutationKey: "removeAdmin" };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [...adminUser.list({ page }).queryKey, variables.adminId],
          context.previousData,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: adminUser.list({ page }).queryKey,
      });
    },
  });

  return mutation;
};
