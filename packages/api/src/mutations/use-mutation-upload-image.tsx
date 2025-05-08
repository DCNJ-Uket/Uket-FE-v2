import { useMutation } from "@tanstack/react-query";
import { fetcherAdmin } from "../admin-instance";

type UploadImageResponse = {
  uketEventImageId: string;
  thumbnailImageId: string;
  bannerImageIds: string;
};

export const useMutationUploadImage = () => {
  const mutation = useMutation({
    mutationFn: async (requestData: FormData) => {
      const { data } = await fetcherAdmin.post<UploadImageResponse>(
        "/upload/images",
        requestData,
        {
          mode: "TOAST_UI",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return data;
    },
  });

  return mutation;
};
