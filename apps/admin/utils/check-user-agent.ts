import { headers } from "next/headers";
import { userAgent } from "next/server";

export const checkUserAgent = async (): Promise<boolean> => {
  const headersList = await headers();

  const { device } = userAgent({
    headers: headersList,
  });

  const isMobileDevice = device?.type === "mobile" ? true : false;

  return isMobileDevice;
};
