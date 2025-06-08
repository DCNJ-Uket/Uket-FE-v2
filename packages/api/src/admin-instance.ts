/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomAxiosError from "@uket/api/error/default";
import { RequestConfig } from "@uket/api/instance";
import { getToken } from "@uket/util/cookie-client";
import { getTokenServer } from "@uket/util/cookie-server";
import {
  isAdminDynamicUrlMatched,
  isAdminStaticUrlMatched,
} from "@uket/util/path";
import axios, { AxiosResponse } from "axios";

const BASE_URL = `https://api.uket.co.kr`;
const API_TYPE = "/admin";

const instance = axios.create({
  baseURL: `${BASE_URL}${API_TYPE}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(async config => {
  const url = config.url;
  const headers = config.headers || {};

  if (!headers.Authorization) {
    const tokenGetter =
      typeof window === "undefined" ? getTokenServer : getToken;
    if (
      url &&
      (isAdminDynamicUrlMatched(url) || isAdminStaticUrlMatched(url))
    ) {
      const accessToken = await tokenGetter("admin", "access");
      if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  config.headers = headers;
  return config;
});

instance.interceptors.response.use(
  async response => {
    return response;
  },
  async (error: CustomAxiosError) => {
    const { status } = error.response!;
    const config = error.config as RequestConfig;

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

export const fetcherAdmin = {
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
