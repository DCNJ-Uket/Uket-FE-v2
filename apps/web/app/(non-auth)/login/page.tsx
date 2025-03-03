import { Metadata } from "next";
import { Auth_Site_Config } from "../../../config/site";

export const metadata: Metadata = {
  title: Auth_Site_Config.title,
  description: Auth_Site_Config.description,
  openGraph: Auth_Site_Config.openGraph,
  twitter: Auth_Site_Config.twitter,
};

export default function Page() {
  return <main className="w-full h-full container">page</main>;
}
