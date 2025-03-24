import { cn } from "@ui/lib/utils";
import { checkUserAgent } from "../../../utils/check-user-agent";
import SignupAuthSection from "../_components/signup-auth-section";

export default async function Page() {
  const isMobileDevice = await checkUserAgent();

  return (
    <section
      className={cn(
        "flex flex-col gap-11 relative my-[-2rem] mx-[-3rem] py-4 px-8 bg-[#F0EDFD]",
        !isMobileDevice && "rounded-xl",
      )}
    >
      <SignupAuthSection />
    </section>
  );
}
