import { cn } from "@uket/ui/lib/utils";
import AdminLogo from "./admin-logo";
import LogoutModal from "./logout-modal";

interface NavProps {
  isMobileDevice?: boolean;
  isAuthorized?: boolean;
}

export default function Nav({
  isMobileDevice = false,
  isAuthorized = false,
}: NavProps) {
  return (
    <header
      className={cn(
        "bg-white",
        isMobileDevice ? "container sticky top-0" : "mt-36 items-center",
      )}
    >
      <nav className="flex items-center justify-between">
        <AdminLogo isMobileDevice={isMobileDevice} />
        {isAuthorized && <LogoutModal isMobileDevice={isMobileDevice} />}
      </nav>
    </header>
  );
}
