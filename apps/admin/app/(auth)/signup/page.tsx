/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@ui/lib/utils";
import { fetcherAdmin } from "@uket/api/admin-instance";
import { checkUserAgent } from "../../../utils/check-user-agent";
import SignupAuthSection from "../_components/signup-auth-section";
import ExpiredContent from "./_components/expired-content";

async function isTokenExpired(token: string | undefined) {
  if (!token) return true;

  try {
    const { data } = await fetcherAdmin.get<{ isExpired: boolean }>(
      `/users/register-expired?token=${token}`,
    );

    return data.isExpired;
  } catch (err) {
    return true;  
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const isMobileDevice = await checkUserAgent();
  const token = (await searchParams).token;

  const isExpired = await isTokenExpired(token);
  
  if (isExpired) return <ExpiredContent />;

  return (
    <section
      className={cn(
        "flex flex-col gap-11 relative py-4 px-4 bg-[#F0EDFD]",
        "md:my-[-2rem] md:mx-[-3rem] md:px-8",
        !isMobileDevice && "rounded-xl",
        isMobileDevice && "w-screen left-1/2 -ml-[50vw]",
      )}
    >
      <SignupAuthSection />
    </section>
  );
}
