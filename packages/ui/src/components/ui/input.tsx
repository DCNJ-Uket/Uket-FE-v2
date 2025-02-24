import * as React from "react";
import { Search } from "lucide-react";

import { cn } from "@uket/ui/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isIcon?: boolean;
  isLeftIcon?: boolean;
  iconClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isIcon, isLeftIcon, iconClick, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {isLeftIcon && (
          <Search
            onClick={iconClick}
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500 hover:cursor-pointer"
          />
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
            className,
            isIcon ? "pr-10" : "",
            isLeftIcon ? "pl-10" : "",
          )}
          ref={ref}
          {...props}
        />
        {isIcon && (
          <Search
            onClick={iconClick}
            className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500 hover:cursor-pointer"
          />
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
