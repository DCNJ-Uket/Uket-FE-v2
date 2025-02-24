import { Cookies } from "react-cookie";

export interface CookieSetOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | "none" | "lax" | "strict";
  partitioned?: boolean;
}

const cookies = new Cookies();

export const REFRESH_TOKEN = {
  set: (name: string, value: string, options?: CookieSetOptions) => {
    const defaultOptions: CookieSetOptions = {
      maxAge: 60 * 60 * 2,
      path: "/",
    };

    cookies.set(name, value, { ...defaultOptions, ...options });
  },
  get: (name: string) => {
    return cookies.get(name);
  },
  clear: (name: string, options?: CookieSetOptions) => {
    return cookies.remove(name, { ...options });
  },
};

export const ACCESS_TOKEN = {
  set: (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
  },
  get: () => {
    return localStorage.getItem("accessToken");
  },
  clear: () => {
    localStorage.removeItem("accessToken");
  },
};
