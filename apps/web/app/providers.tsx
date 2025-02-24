"use client";

import { QueryClientProvider, ReactQueryDevtools } from "@uket/api";

import { getQueryClient } from "@uket/api/get-query-client";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
