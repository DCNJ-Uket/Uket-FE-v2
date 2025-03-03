/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import { Button } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";
import { useErrorBoundaryFallbackProps } from "@uket/api";

interface ProfileErrorFallbackProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ProfileErrorFallback({
  className,
  ...rest
}: ProfileErrorFallbackProps) {
  const { reset } = useErrorBoundaryFallbackProps();

  return (
    <Button
      variant="link"
      className={cn("p-0 text-xs underline", className)}
      onClick={reset}
      {...rest}
    >
      다시 시도
    </Button>
  );
}
