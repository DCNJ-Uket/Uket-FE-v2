"use server";

import { deleteCookie, getCookie, setCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import {
  ADMIN_OPTIONS,
  DEFAULT_OPTIONS,
  getTokenName,
  TokenType,
  UserType,
} from "./cookie-option";

export const getTokenServer = async (
  userType: UserType,
  tokenType: TokenType,
) => {
  const tokenName = getTokenName(userType, tokenType);
  const token = await getCookie(tokenName, { cookies });
  return token;
};

// Note: ❌ It's not possible to update cookies in Server Components
// Must be used in server actions, middleware or api routes
export const setTokenServer = async (
  userType: UserType,
  tokenType: TokenType,
  value: string,
) => {
  const tokenName = getTokenName(userType, tokenType);
  const options = userType === "admin" ? ADMIN_OPTIONS : DEFAULT_OPTIONS;
  await setCookie(tokenName, value, {
    ...options,
    cookies,
  });
};

export const clearTokenServer = async (
  userType: UserType,
  tokenType: TokenType,
) => {
  const tokenName = getTokenName(userType, tokenType);
  await deleteCookie(tokenName, { cookies });
};

export {
  deleteCookie as deleteCookieServer,
  getCookie as getCookieServer,
  setCookie as setCookieServer,
};
