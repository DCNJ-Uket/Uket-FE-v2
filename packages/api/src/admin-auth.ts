import {
  LoginRequestParams,
  LoginResponse,
  SignupRequestParams,
  SignupResponse,
} from "@uket/api/types/admin-auth";
import { fetcherAdmin } from "../../../packages/api/src/admin-instance";

export const adminLogin = async ({ email, password }: LoginRequestParams) => {
  const { data } = await fetcherAdmin.post<LoginResponse>(`/auth/login`, {
    email,
    password,
  });

  return data;
};

export const adminSignup = async ({
  email,
  password,
  name,
}: SignupRequestParams) => {
  const { data } = await fetcherAdmin.post<SignupResponse>(`/auth/signup`, {
    email,
    password,
    name,
  });

  return data;
};
