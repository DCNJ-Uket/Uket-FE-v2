import "@uket/ui/globals.css";
import { cn } from "@uket/ui/lib/utils";
import Nav from "../../components/nav";
import { checkUserAgent } from "../../utils/check-user-agent";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobileDevice = await checkUserAgent();

  return (
    <main className="flex h-dvh flex-col items-center">
      <Nav isMobileAuth={isMobileDevice} />
      <main className="grow w-full mt-12">
        <main
          className={cn(
            "flex h-full flex-col container",
            isMobileDevice ? "w-full" : "max-w-sm",
          )}
        >
          {children}
        </main>
      </main>
    </main>
  );
}
