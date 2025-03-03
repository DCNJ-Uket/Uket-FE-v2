import { Provider } from "@uket/api/types/auth";
import Loader from "./_components/loader";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ provider: Provider }>;
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const provider = (await params).provider;
  const code = (await searchParams).code;

  return <Loader code={code} provider={provider} />;
}
