/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";

import { onErrorHandler, SUCCESS_TOAST } from "./error/handler";

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
        shouldRedactErrors: error => {
          // We should not catch Next.js server errors
          // as that's how Next.js detects dynamic pages
          // so we cannot redact them.
          // Next.js also automatically redacts errors for us
          // with better digests.
          return false;
        },
      },
      mutations: {
        throwOnError: error => {
          if (error.response?.status === 500) return true;
          // error는 axios interceptor에서 전달받은 에러 객체입니다.(CustomAxiosError)
          // error.isToast는 mode === 'TOAST_UI'를 의미합니다.
          // 따라서, 'TOAST_UI'라면 에러를 전파하지 않습니다 (return false)
          return !error.isToast;
        },
        onError: error => onErrorHandler(error),
        onSuccess: (data, _, context) => {
          const mutationKey = (context as any)
            ?.mutationKey as keyof typeof SUCCESS_TOAST;
          if (mutationKey in SUCCESS_TOAST) {
            SUCCESS_TOAST[mutationKey].onSuccess();
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
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
