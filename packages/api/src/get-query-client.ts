/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";

import { onErrorHandler, TOAST_HANDLER } from "./error/handler";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 10,
        retry: false,
        refetchInterval: false,
        throwOnError: error => {
          if (error.response?.status === 500) return true;
          return !error.isToast;
        },
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
        shouldRedactErrors: () => {
          return false;
        },
      },
      mutations: {
        throwOnError: error => {
          if (error.response?.status === 500) return true;
          return !error.isToast;
        },
        onError: (error, _, context) => {
          const mutationKey = (context as any)
            ?.mutationKey as keyof typeof TOAST_HANDLER;
          if (mutationKey in TOAST_HANDLER && TOAST_HANDLER[mutationKey]) {
            TOAST_HANDLER[mutationKey].onError?.(error);
          }
        },
        onSuccess: (data, _, context) => {
          const mutationKey = (context as any)
            ?.mutationKey as keyof typeof TOAST_HANDLER;
          if (mutationKey in TOAST_HANDLER && TOAST_HANDLER[mutationKey]) {
            TOAST_HANDLER[mutationKey].onSuccess();
          }
        },
      },
    },
    queryCache: new QueryCache({
      // throwOnError가 false일 경우에만, onError 핸들러가 호출됩니다.
      onError: error => onErrorHandler(error),
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
