import { Button } from "@ui/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@ui/components/ui/icon";
import { cn } from "@ui/lib/utils";

interface StepControllerProps {
  onNext: () => void;
  onPrev?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  isNextDisabled?: boolean;
}

export default function StepController({
  onNext,
  onPrev,
  isFirstStep = false,
  isLastStep = false,
  isNextDisabled = false,
}: StepControllerProps) {
  return (
    <footer
      className={cn("flex justify-between", isFirstStep && "justify-end")}
    >
      {!isFirstStep && (
        <Button
          variant="ghost"
          className="hover:bg-gray-200 text-[#8989A1] flex gap-1"
          onClick={onPrev}
        >
          <ArrowLeftIcon size={16} strokeWidth={3} />
          이전으로
        </Button>
      )}
      <Button
        type={isLastStep ? "submit" : "button"}
        variant="ghost"
        className="hover:bg-gray-200 flex gap-1 text-brand"
        disabled={isNextDisabled}
        onClick={onNext}
      >
        {isLastStep ? "제출하기" : "다음으로"}
        <ArrowRightIcon size={16} strokeWidth={3} />
      </Button>
    </footer>
  );
}
