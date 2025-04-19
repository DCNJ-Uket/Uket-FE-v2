import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-white flex flex-col gap-3 w-full text-xs py-10">
      <div className="space-y-1">
        <p className="font-bold">
          유켓{"("}UKET{")"}
        </p>
        <p>
          제휴 문의:{" "}
          <Link
            href="mailto:uket.info@gmail.com"
            className="underline underline-offset-2"
          >
            uket.info@gmail.com
          </Link>
        </p>
      </div>
      <div className="space-y-1">
        <p>대표: 곽민재</p>
        <p>사업자 등록번호: 530-72-00551</p>
        <p>주소: 경기도 수원시 팔달구 경수대로553번길 18-20</p>
      </div>
      <div>@2025 UKET ALL Rights Reserved.</div>
    </footer>
  );
}
