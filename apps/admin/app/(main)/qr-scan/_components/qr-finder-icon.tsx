export default function QrFinderIcon() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="text-brand relative left-0 top-0 z-[1] box-border h-full w-full "
      height="100%"
      width="100%"
    >
      <path
        fill="none"
        d="M25,10 L10,10 L10,25"
        stroke="currentColor"
        strokeWidth="1"
      ></path>
      <path
        fill="none"
        d="M10,75 L10,90 L25,90"
        stroke="currentColor"
        strokeWidth="1"
      ></path>
      <path
        fill="none"
        d="M75,90 L90,90 L90,75"
        stroke="currentColor"
        strokeWidth="1"
      ></path>
      <path
        fill="none"
        d="M90,25 L90,10 L75,10"
        stroke="currentColor"
        strokeWidth="1"
      ></path>
    </svg>
  );
}
