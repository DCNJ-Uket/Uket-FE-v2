import SignupErrorFallback from "../../../components/error-fallback/signup-error-fallback";
import RetryApiErrorBoundary from "../../../components/retry-api-error-boundary";
import SignupSection from "./_components/signup-section";

export default function Page() {
  return (
    <RetryApiErrorBoundary fallback={<SignupErrorFallback />}>
      <main className="w-full h-full flex flex-col relative">
        <SignupSection />
      </main>
    </RetryApiErrorBoundary>
  );
}
