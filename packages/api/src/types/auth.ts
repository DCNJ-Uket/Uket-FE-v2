export type Provider = "kakao" | "google";

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  isRegistered: boolean;
};

export type LoginRequestParams = {
  code: string;
  provider: Provider;
};
