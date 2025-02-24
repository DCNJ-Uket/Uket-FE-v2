import { cn } from "@uket/ui/lib/utils";
import Image from "next/image";
import Link from "next/link";
import LogoImage from "../public/logo.png";

interface AdminLogoProps {
  isMobileDevice?: boolean;
  styleOverride?: {
    image: string;
    font: string;
  };
}

export default function AdminLogo({
  isMobileDevice = false,
  styleOverride,
}: AdminLogoProps) {
  return (
    <Link href={"/"} className="flex items-end gap-2 py-4">
      <div
        className={cn(
          "relative",
          isMobileDevice ? "w-16" : "w-32",
          styleOverride && styleOverride.image,
        )}
      >
        <Image
          src={LogoImage}
          alt="logo"
          width={200}
          height={200}
          className="object-cover"
        />
      </div>
      <p
        className={cn(
          "text-brand flex flex-col justify-end",
          isMobileDevice ? "text-sm font-bold" : "text-lg font-medium",
          styleOverride && styleOverride.font,
        )}
      >
        for admin
      </p>
    </Link>
  );
}
