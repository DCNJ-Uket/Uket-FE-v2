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
    mutationKey: ["changeEventStatus"],
    mutationFn: async ({
      uketEventRegistrationId,
      registrationStatus,
    }: ChangeEventStatusParams) => {
      const { data } = await fetcherAdmin.put<ChangeEventStatusResponse>(
        `/uket-event-registrations/${uketEventRegistrationId}/status/${registrationStatus}`,
        null,
        {
          mode: "TOAST_UI",
          errorContent: {
            title: "행사 상태 변경 에러",
            description: "변경할 수 없는 상태입니다.",
          },
        },
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

      return { previousData, mutationKey: "changeEventStatus" };
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
