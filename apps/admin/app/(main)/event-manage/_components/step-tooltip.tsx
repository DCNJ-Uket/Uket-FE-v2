import { CircleHelpIcon } from "@ui/components/ui/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/components/ui/tooltip";

interface StepTooltipProps {
  content: React.ReactNode;
}

export default function StepTooltip({ content }: StepTooltipProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <CircleHelpIcon size={18} className="text-white fill-[#8989A1]" />
        </TooltipTrigger>
        <TooltipContent
          className="bg-[#8989A1] text-white border-none max-w-xs p-3 rounded-xl font-normal"
          side="top"
          align="start"
          sideOffset={12}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
