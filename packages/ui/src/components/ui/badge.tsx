import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@uket/ui/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80",
        secondary:
          "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        destructive:
          "border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/80",
        outline: "text-slate-950 dark:text-slate-50",
        banner: "border-transparent bg-[#f2f2f2c1] text-[#5E5E6E]",
        reservation:
          "border-transparent bg-[#5E5E6E] text-[#81B0FE] w-22 gap-1 items-center after:content-[''] after:w-2 after:h-2 after:bg-[#81B0FE] after:rounded-full",
        enter:
          "border-transparent bg-[#5E5E6E] text-[#9981FE] w-22 gap-1 items-center after:content-[''] after:w-2 after:h-2 after:bg-[#9981FE] after:rounded-full",
        deposit:
          "border-transparent bg-[#5E5E6E] text-[#FFEF60] w-22 gap-1 items-center after:content-[''] after:w-2 after:h-2 after:bg-[#FFEF60] after:rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
