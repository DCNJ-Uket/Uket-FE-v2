import {
  AdminLoginRequestParams,
  AdminLoginResponse,
  AdminSignupRequestParams,
  AdminSignupResponse,
} from "@uket/api/types/admin-auth";
import { fetcherAdmin } from "../../../packages/api/src/admin-instance";

export const adminLogin = async ({
  email,
  password,
}: AdminLoginRequestParams) => {
  const { data } = await fetcherAdmin.post<AdminLoginResponse>(`/users/login`, {
    email,
    password,
  });

  return data;
};

export const adminSignup = async ({
  email,
  password,
  token,
}: AdminSignupRequestParams & { token: string }) => {
  const { data } = await fetcherAdmin.post<AdminSignupResponse>(
    `/users/password`,
    { email, password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: "TOAST_UI",
    },
  );

  return data;
};
