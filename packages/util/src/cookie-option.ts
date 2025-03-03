export type TokenType = "access" | "refresh";
export type UserType = "admin" | "user";

export interface CookieOptions {
  maxAge?: number;
  path?: string;
}

export const DEFAULT_OPTIONS: CookieOptions = {
  maxAge: 60 * 60 * 2, // 2 hours
  path: "/",
};

export const ADMIN_OPTIONS: CookieOptions = {
  ...DEFAULT_OPTIONS,
  maxAge: 60 * 60 * 6, // 6 hours for admin
};

export const getTokenName = (
  userType: UserType,
  tokenType: TokenType,
): TokenType => {
  const prefix = userType === "admin" ? "admin-" : "";
  const tokenName = tokenType === "access" ? "accessToken" : "refreshToken";
  return `${prefix}${tokenName}` as TokenType;
};
