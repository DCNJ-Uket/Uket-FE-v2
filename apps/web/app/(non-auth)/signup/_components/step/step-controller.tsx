/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Button } from "@ui/components/ui/button";
import { ChevronLeftIcon } from "@ui/components/ui/icon";

export interface StepControllerProps {
  onPrev: () => void;
  onNext: (...args: any[]) => void;
}

interface StepPrevControllerProps extends Pick<StepControllerProps, "onPrev"> {}

function StepPrevController({ onPrev }: StepPrevControllerProps) {
  return (
    <nav className="h-14 my-2 flex w-full items-center justify-between self-stretch px-2">
      <Button
        size="icon"
        variant="ghost"
        className="hover:bg-gray-100"
        onClick={onPrev}
      >
        <ChevronLeftIcon />
      </Button>
    </nav>
  );
}

interface StepNextControllerProps extends Pick<StepControllerProps, "onNext"> {
  disabled: boolean;
  isLastStep?: boolean;
}

function StepNextController({
  disabled,
  onNext,
  isLastStep = false,
}: StepNextControllerProps) {
  return (
    <Button
      type={isLastStep ? "submit" : "button"}
      className="bg-brand hover:bg-brandHover h-16 w-full rounded-none text-base font-extrabold"
      onClick={onNext}
      disabled={disabled}
    >
      다음으로
    </Button>
  );
}

export { StepNextController, StepPrevController };
