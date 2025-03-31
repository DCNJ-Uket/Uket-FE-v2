import { LoaderCircleIcon } from "@ui/components/ui/icon";

// NOTE: Loader Component for page loading...
export default function Loading() {
  return (
    <main className="flex h-dvh flex-col items-center justify-center gap-3 bg-transparent">
      <LoaderCircleIcon
        className="flex items-center justify-center animate-spin text-brand"
        size={28}
      />
    </main>
  );
}
