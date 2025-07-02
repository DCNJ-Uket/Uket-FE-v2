import { useMutation } from "@tanstack/react-query";
import { fetcherAdmin } from "../admin-instance";
import { getQueryClient } from "../get-query-client";
import { adminEventInfo } from "../queries/admin-event-info";
import {
  ChangeEventStatusParams,
  ChangeEventStatusResponse,
} from "../types/admin-event";

export const useMutationChangeEventStatus = (page: number) => {
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      uketEventRegistrationId,
      registrationStatus,
    }: ChangeEventStatusParams) => {
      const { data } = await fetcherAdmin.put<ChangeEventStatusResponse>(
        `/uket-event-registrations/${uketEventRegistrationId}/status/${registrationStatus}`,
      );
      
      return data;
    },
    onMutate: async ({
      uketEventRegistrationId,
      registrationStatus,
    }: ChangeEventStatusParams) => {
      const previousData = queryClient.getQueryData<ChangeEventStatusResponse>([
        ...adminEventInfo.list({ page }).queryKey,
        uketEventRegistrationId,
      ]);

      await queryClient.cancelQueries({
        queryKey: adminEventInfo.list({ page }).queryKey,
      });

      if (previousData) {
        queryClient.setQueryData<ChangeEventStatusResponse>(
          [...adminEventInfo.list({ page }).queryKey, uketEventRegistrationId],
          { ...previousData, registrationStatus },
        );
      }

      return { previousData };
    },

    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [
            ...adminEventInfo.list({ page }).queryKey,
            variables.uketEventRegistrationId,
          ],
          context.previousData,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: adminEventInfo.list({ page }).queryKey,
      });
    },
  });

  return mutation;
};
