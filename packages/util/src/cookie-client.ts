// ref: https://github.com/andreizanik/cookies-next
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import {
  ADMIN_OPTIONS,
  DEFAULT_OPTIONS,
  getTokenName,
  TokenType,
  UserType,
} from "./cookie-option";

// Client-side functions
export const setToken = (
  type: UserType,
  tokenType: TokenType,
  value: string,
) => {
  const tokenName = getTokenName(type, tokenType);
  const options = type === "admin" ? ADMIN_OPTIONS : DEFAULT_OPTIONS;
  setCookie(tokenName, value, options);
};

export const getToken = (type: UserType, tokenType: TokenType) => {
  const tokenName = getTokenName(type, tokenType);
  return getCookie(tokenName);
};

export const clearToken = (type: UserType, tokenType: TokenType) => {
  const tokenName = getTokenName(type, tokenType);
  deleteCookie(tokenName);
};

export { setCookie, getCookie, deleteCookie };
