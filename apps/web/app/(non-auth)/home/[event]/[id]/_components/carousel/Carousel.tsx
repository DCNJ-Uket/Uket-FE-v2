/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@ui/components/ui/carousel";
import { UketEventDetail } from "@uket/api/types/uket-event";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Indicator from "../../../../../../../components/indicator";
import CarouselDotButtonList from "./CarouselDotButtonList";

interface PropType {
  slides: UketEventDetail["banners"] | undefined;
}

const CarouselT = ({ slides }: PropType) => {
  const [emblaApi, setEmblaApi] = useState<CarouselApi>();
  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const updateSlidesInView = () => {
      setSlidesInView(slidesInView => {
        if (slidesInView.length === emblaApi.slideNodes().length) {
          emblaApi.off("slidesInView", updateSlidesInView);
        }
        const inView = emblaApi
          .slidesInView()
          .filter((index: number) => !slidesInView.includes(index));
        return slidesInView.concat(inView);
      });
    };

    emblaApi.on("slidesInView", updateSlidesInView);
    emblaApi.on("reInit", updateSlidesInView);
  }, [emblaApi]);

  const slideComponent =
    !slides || slides.length === 0 ? (
      <CarouselItem className="h-60">
        <p className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-gray-100 text-gray-500">
          등록된 배너가 없어요.
        </p>
      </CarouselItem>
    ) : (
      slides.map(({ id, imagePath, link }) => (
        <CarouselItem key={id} className="basis-full">
          <Link href={link || "/404"} target="_blank">
            <div>
              <div className="relative">
                <div className="relative h-60 w-full rounded-lg p-0 sm:h-80 lg:h-96">
                  <Image
                    src={imagePath || "/default-event-image.png"}
                    alt="축제 배너"
                    width={100}
                    height={100}
                    className="block h-full w-full rounded-lg bg-gray-100 object-cover"
                  />
                </div>
                <Indicator
                  title={"행사 정보"}
                  className="text-desc left-3 top-3 text-xs"
                />
              </div>
            </div>
          </Link>
        </CarouselItem>
      ))
    );

  return (
    <Carousel
      className="w-full max-w-full"
      opts={{ align: "start", loop: true }}
      plugins={[
        Autoplay({
          delay: 2500,
        }),
      ]}
      setApi={setEmblaApi}
    >
      <CarouselContent>{slideComponent}</CarouselContent>
      {emblaApi && emblaApi.slideNodes().length > 1 && (
        <CarouselDotButtonList emblaApi={emblaApi} />
      )}
    </Carousel>
  );
};

export default CarouselT;
