import { Metadata } from "next";
import { Select_Event_Site_Config } from "../../../config/site";

export const metadata: Metadata = {
  title: Select_Event_Site_Config.title,
  description: Select_Event_Site_Config.description,
  openGraph: Select_Event_Site_Config.openGraph,
  twitter: Select_Event_Site_Config.twitter,
};

export default function Page() {
  return <main className="w-full h-full container"></main>;
}
