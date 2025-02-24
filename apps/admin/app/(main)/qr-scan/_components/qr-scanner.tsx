/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useMutationQrScan } from "@uket/api/mutations/useMutationQrScan";
import { toast } from "@uket/ui/components/ui/sonner";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import QrFinderIcon from "./qr-finder-icon";

// TODO: 기능 테스트 후 에러 메시지 구체화
export default function QrScanner() {
  const { mutate } = useMutationQrScan<IDetectedBarcode>();

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    mutate(detectedCodes, {
      onSuccess: data => {
        const { userName, msg } = data;

        toast(`예매자: ${userName}`, {
          description: msg,
          duration: 3000,
          position: "top-center",
        });
      },
      // TODO: Toast 설정
      onError: error => {
        toast.error(`에러 발생`, {
          duration: 3000,
          position: "top-center",
        });
      },
    });
  };
  return (
    <div className="relative h-full">
      <Scanner
        formats={["qr_code"]}
        onScan={handleScan}
        classNames={{ video: "object-cover" }}
        styles={{ finderBorder: 1 }}
        components={{ finder: false }}
        allowMultiple
        scanDelay={2000}
      >
        <QrFinderIcon />
        <h1 className="absolute left-0 top-6 w-full text-2xl font-bold text-white sm:text-3xl">
          <p className="flex justify-center">
            <span className="bg-brand px-1">입장 QR 코드를 스캔</span>
            <span>해 주세요.</span>
          </p>
        </h1>
        <footer className="absolute bottom-16 left-0 w-full text-white">
          <p className="flex justify-center font-medium">
            QR 코드를 가운데 위치 시키세요.
          </p>
        </footer>
      </Scanner>
    </div>
  );
}
