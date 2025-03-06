import { CarouselApi } from "@uket/ui/components/ui/carousel";


import { CarouselDotButton } from "./CarouselDotButton";

import "./Carousel.css";
import { useDotButton } from "../../../../../../../hooks/use-dot-button";

interface CarouselDotButtonListProps {
  emblaApi: CarouselApi;
}

const CarouselDotButtonList = ({ emblaApi }: CarouselDotButtonListProps) => {
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="embla__controls">
      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <CarouselDotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            selected={index === selectedIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselDotButtonList;
