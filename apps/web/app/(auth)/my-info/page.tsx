import DeleteUserModal from "../../../components/delete-user-modal";
import DefaultErrorFallback from "../../../components/error-fallback/default-error-fallback";
import LogoutModal from "../../../components/logout-modal";
import RetryApiErrorBoundary from "../../../components/retry-api-error-boundary";
import InfoSection from "./_components/info-section";

export default function Page() {
  return (
    <main className="w-full h-full bg-[#F2F2F2]">
      <main className="flex flex-col gap-3 w-full h-full">
        <RetryApiErrorBoundary fallback={<DefaultErrorFallback />}>
          <InfoSection />
        </RetryApiErrorBoundary>
        <section className="mb-5 mt-auto flex items-center gap-4 px-5">
          <DeleteUserModal />
          <LogoutModal />
        </section>
      </main>
    </main>
  );
}
