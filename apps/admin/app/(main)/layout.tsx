import "@uket/ui/globals.css";
import { cn } from "@uket/ui/lib/utils";
import { getAccessToken } from "@uket/util/admin-token";
import Footer from "../../components/footer";
import GreetingHeader from "../../components/greeting-header";
import Nav from "../../components/nav";
import SideNav from "../../components/side-nav";
import { checkUserAgent } from "../../utils/check-user-agent";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobileDevice = await checkUserAgent();
  const isAuthorized = (await getAccessToken()) ? true : false;

  return (
    <>
      <main className={cn("flex h-dvh", isMobileDevice && "flex-col")}>
        <header className={cn("sticky top-0", isMobileDevice && "container")}>
          {isMobileDevice ? (
            <Nav isAuthorized={isAuthorized} isMobileDevice />
          ) : (
            <SideNav />
          )}
        </header>
        <main className="grow bg-[#F2F2F2]">
          {isMobileDevice && <GreetingHeader isMobileDevice />}
          {children}
        </main>
        <footer className="z-50 bg-white">
          {isMobileDevice && <Footer />}
        </footer>
      </main>
    </>
  );
}
