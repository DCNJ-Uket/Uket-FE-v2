import { ACCESS_TOKEN, REFRESH_TOKEN } from "@uket/util/token";

import { fetcher } from "./instance";
import { LoginRequestParams } from "./types/auth";

export const BASE_URL =
  process.env.MODE === "development"
    ? "https://localhost:5173"
    : "https://www.uket.site";

export const KAKAO_REDIRECT_URI = `${BASE_URL}/login/kakao`;
export const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;

export const GOOGLE_REDIRECT_URI = `${BASE_URL}/login/google`;
export const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=email+profile&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}`;

export const login = async ({ code, provider }: LoginRequestParams) => {
  const redirect_uri =
    provider === "google" ? GOOGLE_REDIRECT_URI : KAKAO_REDIRECT_URI;

  const { data } = await fetcher.post(`/auth/login/${provider}`, {
    code,
    redirectUri: redirect_uri,
  });

  return data;
};

export const signup = async ({
  userName,
  userPhone,
}: {
  userName: string;
  userPhone: string;
}) => {
  const baseBody = {
    depositorName: userName,
    phoneNumber: userPhone,
  };

  const { data } = await fetcher.post("/users/register", baseBody);

  return data;
};

export const reissue = async () => {
  const refreshToken = REFRESH_TOKEN.get("refreshToken");
  const accessToken = ACCESS_TOKEN.get();

  const { data } = await fetcher.post(
    "/auth/reissue",
    {
      accessToken,
      refreshToken,
    },
    {
      mode: "TOAST_UI",
      errorContent: {
        title: "토큰 갱신에 오류가 발생했어요.",
        description: "다시 로그인 해주세요.",
      },
    },
  );

  const { accessToken: newAccessToken } = data;

  return newAccessToken;
};
