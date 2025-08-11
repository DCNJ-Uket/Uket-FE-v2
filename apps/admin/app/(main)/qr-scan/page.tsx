import { Viewport } from "next";
import QrScanner from "./_components/qr-scanner";

export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function Page() {
  return (
    <main className="flex h-full flex-col touch-none">
      <section className="flex grow justify-center">
        <main className="relative h-full sm:max-w-fit">
          <QrScanner />
        </main>
      </section>
    </main>
  );
}
