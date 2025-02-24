import QrScanner from "./_components/qr-scanner";

export default function Page() {
  return (
    <main className="flex h-full flex-col">
      <section className="flex grow justify-center">
        <main className="relative h-full sm:max-w-fit">
          <QrScanner />
        </main>
      </section>
    </main>
  );
}
