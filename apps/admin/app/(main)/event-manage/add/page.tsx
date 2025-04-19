import EventAddSection from "../_components/event-add-section";

export default function Page() {
  return (
    <main className="flex h-full flex-col grow gap-5 pl-16 pr-20 pt-20">
      <div className="flex items-end justify-between">
        <h1 className="text-[34px] font-bold">행사 정보 등록</h1>
      </div>
      <EventAddSection />
    </main>
  );
}
