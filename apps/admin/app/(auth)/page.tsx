import AuthSection from "./_components/auth-section";

export const dynamic = "force-static";

export default async function Page() {
  return (
    <section className="mt-12 flex flex-col gap-11">
      <AuthSection />
    </section>
  );
}
