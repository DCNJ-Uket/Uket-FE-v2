/* eslint-disable react-hooks/exhaustive-deps */
import {
  useQueryUketEventImage,
  useQueryUketEventImageList,
} from "@uket/api/queries/uket-event";
import { useEffect } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { PaymentSchemaType } from "./use-add-event-form";

interface useInitStepProps {
  eventImageId: string | undefined;
  thumbnailImageId: string | undefined;
  bannerList: string[];
  onSetValue: UseFormSetValue<FieldValues>;
  initialBannerList: PaymentSchemaType["banners"];
}

export const useInitStep = ({
  eventImageId,
  thumbnailImageId,
  bannerList,
  onSetValue,
  initialBannerList,
}: useInitStepProps) => {
  const { data: uketEventImage } = useQueryUketEventImage(eventImageId);
  const { data: thumbnailImage } = useQueryUketEventImage(thumbnailImageId);
  const { data: bannerImageList } = useQueryUketEventImageList(bannerList);

  useEffect(() => {
    if (uketEventImage && uketEventImage instanceof Blob) {
      onSetValue(
        "uketEventImageId.previewImage",
        URL.createObjectURL(uketEventImage),
      );
    }
    if (thumbnailImage && thumbnailImage instanceof Blob) {
      onSetValue(
        "thumbnailImageId.previewImage",
        URL.createObjectURL(thumbnailImage),
      );
    }
    if (bannerImageList && bannerImageList.length > 0) {
      if (initialBannerList.length > 0) {
        onSetValue(
          "banners",
          bannerImageList.map((banner, idx) => ({
            file: initialBannerList[idx]?.file,
            previewImage: URL.createObjectURL(banner),
            id: initialBannerList[idx]?.id,
            link: initialBannerList[idx]!.link,
          })),
        );
      }
    }
  }, [uketEventImage, thumbnailImage, bannerImageList]);
};
