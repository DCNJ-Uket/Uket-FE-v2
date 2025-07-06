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
      const file = new File([uketEventImage], `poster.png`, {
        type: uketEventImage.type,
      });
      onSetValue("uketEventImageId.file", file);
    }
    if (thumbnailImage && thumbnailImage instanceof Blob) {
      onSetValue(
        "thumbnailImageId.previewImage",
        URL.createObjectURL(thumbnailImage),
      );
      const file = new File([thumbnailImage], `thumbnail.png`, {
        type: thumbnailImage.type,
      });
      onSetValue("thumbnailImageId.file", file);
    }
    if (bannerImageList && bannerImageList.length > 0) {
      if (initialBannerList.length > 0) {
        onSetValue(
          "banners",
          bannerImageList.map((banner, idx) => {
            let previewImage;
            let file;
        
            if (banner instanceof Blob) {
              previewImage = URL.createObjectURL(banner);
              file = new File([banner], `banner.png`, { type: banner.type });
            } else if (typeof banner === "string") {
              previewImage = banner;
              file = undefined; // 혹은 필요에 따라 처리
            }
        
            return {
              file,
              previewImage,
              id: initialBannerList[idx]?.id,
              link: initialBannerList[idx]?.link,
            };
          })
        );
      }
    }
  }, [uketEventImage, thumbnailImage, bannerImageList]);
};
