"use client";

import { OverlayProvider } from "@toss/use-overlay";
import { QueryClientProvider, ReactQueryDevtools } from "@uket/api";

import { getQueryClient } from "@uket/api/get-query-client";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>{children}</OverlayProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
