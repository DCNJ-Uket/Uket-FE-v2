import { useMutation } from "@uket/api";
import { TicketQrCodeResponse } from "@uket/api/types/admin-ticket";
import { fetcherAdmin } from "../admin-instance";

export const useMutationQrScan = <T extends { rawValue: string }>() => {
  const mutation = useMutation({
    mutationFn: async (detectedCodes: T[]) => {
      const { rawValue: qrCode } = detectedCodes[0]!;

      const { data } = await fetcherAdmin.post<TicketQrCodeResponse>(
        `/tickets/${qrCode}/enter`,
      );
      return data;
    },
    throwOnError: false,
  });

  return mutation;
};
