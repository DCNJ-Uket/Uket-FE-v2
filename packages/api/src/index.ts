export {
  HydrationBoundary,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
  dehydrate,
  useMutation,
  useQueryClient,
  useQueryErrorResetBoundary,
} from "@tanstack/react-query";
export { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export { isAxiosError } from "axios";

export * from "@suspensive/react";
export type * as DefaultErrorType from "./types/index.d.ts";
