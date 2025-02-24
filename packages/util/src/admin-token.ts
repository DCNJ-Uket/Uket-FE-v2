"use server";

import { cookies } from "next/headers";

const getAccessToken = async () => {
  return (await cookies()).get("admin-accessToken")?.value;
};

const setAccessToken = async (token: string) => {
  (await cookies()).set({
    name: "admin-accessToken",
    value: token,
    maxAge: 60 * 60 * 6,
  });
};

const clearAccessToken = async () => {
  (await cookies()).delete("admin-accessToken");
};

export { clearAccessToken, getAccessToken, setAccessToken };
