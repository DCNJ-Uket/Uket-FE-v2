import {
  AdminLoginRequestParams,
  AdminLoginResponse,
  AdminSignupRequestParams,
  AdminSignupResponse,
} from "@uket/api/types/admin-auth";
import { fetcherAdmin } from "../../../packages/api/src/admin-instance";

export const adminLogin = async ({ email, password }: AdminLoginRequestParams) => {
  const { data } = await fetcherAdmin.post<AdminLoginResponse>(`/auth/login`, {
    email,
    password,
  });

  return data;
};

export const adminSignup = async ({
  email,
  password,
  name,
}: AdminSignupRequestParams) => {
  const { data } = await fetcherAdmin.post<AdminSignupResponse>(`/auth/signup`, {
    email,
    password,
    name,
  });

  return data;
};
