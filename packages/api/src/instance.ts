/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import CustomAxiosError from "./error/default";
import { reissue } from "./auth";
import { isDynamicUrlMatched, isStaticUrlMatched } from "@uket/util/path";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@uket/util/token";

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

const BASE_URL = `https://dev.api.uket.site`;
const SERVER_VERSION = "/api/v1";

const instance = axios.create({
  baseURL: `${BASE_URL}${SERVER_VERSION}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(config => {
  if (
    config.url &&
    (isStaticUrlMatched(config.url) || isDynamicUrlMatched(config.url))
  ) {
    const accessToken = ACCESS_TOKEN.get();

    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  async response => {
    return response;
  },
  async (error: AxiosError) => {
    const { status } = error.response!;
    const config = error.config as RequestConfig;

    if (
      (status === 404 || status === 403 || status === 400) &&
      config.url === "/auth/reissue"
    ) {
      ACCESS_TOKEN.clear();
      REFRESH_TOKEN.clear("refreshToken");
      window.location.replace("/login");
    }

    if (
      status === 401 &&
      (isStaticUrlMatched(config.url!) ||
        isDynamicUrlMatched(config.url!))
    ) {
      const newAccessToken = await reissue();

      ACCESS_TOKEN.set(newAccessToken);

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

const defaultConfig: RequestConfig = { mode: "BOUNDARY" };

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
