import { SVGProps } from "react";

export function ChevronTripleRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity="0.3"
        d="M1 1L6.21739 6L1 11"
        stroke="#2F2F37"
        strokeWidth="1.6"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.5"
        d="M7 1L12.2174 6L7 11"
        stroke="#2F2F37"
        strokeWidth="1.6"
        strokeMiterlimit="10"
      />
      <path
        opacity="0.8"
        d="M13 1L18.2174 6L13 11"
        stroke="#2F2F37"
        strokeWidth="1.6"
        strokeMiterlimit="10"
      />
    </svg>
  );
}
