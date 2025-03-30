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

function StepNextController({ disabled, onNext }: StepNextControllerProps) {
  return (
    <Button
      type="button"
      className="bg-brand hover:bg-brandHover disabled:bg-formInput h-16 w-full rounded-none text-base font-extrabold disabled:text-black disabled:opacity-100"
      onClick={onNext}
      disabled={disabled}
    >
      다음으로
    </Button>
  );
}

export { StepNextController, StepPrevController };
