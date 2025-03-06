/* eslint-disable react/prop-types */
import { cn } from "@uket/ui/lib/utils";
import React, { PropsWithChildren } from "react";

type CarouselDotButtonProps = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> & { selected: boolean };

export const CarouselDotButton = ({
  children,
  className,
  selected,
  ...rest
}: CarouselDotButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "embla__dot",
        className,
        selected && " embla__dot--selected",
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
