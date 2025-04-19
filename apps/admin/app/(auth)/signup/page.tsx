import { cn } from "@ui/lib/utils";
import { checkUserAgent } from "../../../utils/check-user-agent";
import SignupAuthSection from "../_components/signup-auth-section";

export default async function Page() {
  const isMobileDevice = await checkUserAgent();

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
