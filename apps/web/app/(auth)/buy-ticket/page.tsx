import TicketBuyErrorFallback from "../../../components/error-fallback/ticket-buy-error-fallback";

import RetryApiErrorBoundary from "../../../components/retry-api-error-boundary";
import BuyTicketSection from "./test-buy-ticket-section";

export default function Page() {
  return (
    <RetryApiErrorBoundary fallback={<TicketBuyErrorFallback />}>
      <main className="w-full h-full flex flex-col relative">
        <BuyTicketSection />
      </main>
    </RetryApiErrorBoundary>
  );
}
