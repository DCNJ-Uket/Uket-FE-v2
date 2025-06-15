/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { getToken } from "@uket/util/cookie-client";
import {
  clearTokenServer,
  getTokenServer,
  setTokenServer,
} from "@uket/util/cookie-server";
import { isDynamicUrlMatched, isStaticUrlMatched } from "@uket/util/path";
import { redirect } from "next/navigation";
import { reissue } from "./auth";
import CustomAxiosError from "./error/default";

type ErrorDisplayMode = "TOAST_UI" | "BOUNDARY";

// 기본적인 커스텀 config는 mode를 포함합니다.
interface RequestConfigBase extends AxiosRequestConfig {
  mode: ErrorDisplayMode;
}

// 토스트를 표시하는 커스텀 config 입니다.
// errorContent라는 추가적인 필드를 갖습니다. 이는 토스트에 표시할 제목, 내용을 구성합니다.
interface RequestConfigWithToast extends RequestConfigBase {
  mode: "TOAST_UI";
  errorContent?: {
    title: string;
    description?: string;
  } | null;
}

// 에러를 Error Boundary로 처리할때 사용하는 커스텀 config 입니다.
// errorContent는 사용하지 않기 때문에 제외합니다.
interface RequestConfigWithBoundary extends RequestConfigBase {
  mode: "BOUNDARY";
}

// 사용자가 설정한 mode에 따라 config의 타입이 바뀝니다.
export type RequestConfig = RequestConfigWithToast | RequestConfigWithBoundary;

const isProduction =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
const BASE_URL = isProduction
  ? `https://api.uket.co.kr`
  : `https://dev.api.uket.co.kr`;

const instance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(async config => {
  const url = config.url;
  if (typeof window === "undefined") {
    // Server-side
    if (url && (isStaticUrlMatched(url) || isDynamicUrlMatched(url))) {
      const accessToken = await getTokenServer("user", "access");
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } else {
    // Client-side
    if (url && (isStaticUrlMatched(url) || isDynamicUrlMatched(url))) {
      const accessToken = getToken("user", "access");
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

instance.interceptors.response.use(
  async response => {
    return response;
  },
  async (error: CustomAxiosError) => {
    // Add null check for error.response
    const { status } = error.response!;
    const config = error.config as RequestConfig;

    // TODO: production 환경에서 redirect 테스트 필요
    if (
      (status === 404 || status === 403 || status === 400) &&
      config.url === "/auth/reissue"
    ) {
      clearTokenServer("user", "access");
      clearTokenServer("user", "refresh");
      redirect("/login");
    }

    if (
      status === 401 &&
      (isStaticUrlMatched(config.url!) || isDynamicUrlMatched(config.url!))
    ) {
      const newAccessToken = await reissue();

      await setTokenServer("user", "access", newAccessToken);
      config.headers!.Authorization = `Bearer ${newAccessToken}`;

      return instance(config);
    }

    return Promise.reject(
      new CustomAxiosError(
        error,
        config.mode === "TOAST_UI" && config.errorContent
          ? config.errorContent
          : null,
        config.mode === "TOAST_UI",
      ),
    );
  },
);

const request = async <T>(promise: Promise<AxiosResponse<T>>) => {
  const response = await promise;
  return response;
};

const defaultConfig: RequestConfig = { mode: "BOUNDARY" }; // 디폴트 에러 처리는 에러 바운더리

export const fetcher = {
  get: <T = any>(pathname: string, config?: RequestConfig) =>
    request<T>(instance.get(pathname, { ...defaultConfig, ...config })),
  post: <T = any>(pathname: string, data?: unknown, config?: RequestConfig) =>
    request<T>(
      instance.post<T>(pathname, data, { ...defaultConfig, ...config }),
    ),
  put: <T = any>(pathname: string, data?: unknown, config?: RequestConfig) =>
    request<T>(
      instance.put<T>(pathname, data, { ...defaultConfig, ...config }),
    ),
  delete: <T = any>(pathname: string, config?: RequestConfig) =>
    request<T>(instance.delete<T>(pathname, { ...defaultConfig, ...config })),
  patch: <T = any>(pathname: string, data?: unknown, config?: RequestConfig) =>
    request<T>(
      instance.patch<T>(pathname, data, { ...defaultConfig, ...config }),
    ),
};
