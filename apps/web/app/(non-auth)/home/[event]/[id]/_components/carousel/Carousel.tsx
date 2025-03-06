/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent } from "@ui/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@ui/components/ui/carousel";
import { FestivalInfo } from "@uket/api/types/univ";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Indicator from "../../../../../../../components/indicator";
import CarouselDotButtonList from "./CarouselDotButtonList";

interface PropType {
  slides: FestivalInfo["banners"] | undefined;
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

  const slideComponent = !slides ? (
    <CarouselItem>
      <div className="p-1">
        <Card>
          <CardContent className="flex aspect-square items-center justify-center p-6">
            <p className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-gray-100 text-gray-500">
              배너가 존재하지 않아요 😢
            </p>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  ) : (
    slides.map(({ title, url, redirectUrl }) => (
      <CarouselItem key={url} className="basis-full">
        <Link href={redirectUrl || "/404"} target="_blank">
          <div className="p-1">
            <Card className="border-none">
              <CardContent className="relative h-60 rounded-lg p-0 shadow-md sm:h-80 lg:h-96">
                <Image
                  src={url}
                  alt="축제 배너"
                  width={100}
                  height={100}
                  className="block h-full w-full rounded-lg bg-gray-100 object-cover"
                />
                <Indicator
                  title={title}
                  className="text-desc left-3 top-3 text-xs"
                />
              </CardContent>
            </Card>
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
      <CarouselDotButtonList emblaApi={emblaApi} />
    </Carousel>
  );
};

export default CarouselT;
