/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueryAdminTicketList } from "@uket/api/queries/admin-ticket";
import { SearchType } from "@uket/api/types/admin-ticket";

import { formatDate } from "@uket/util/time";
import React from "react";
import { useTicketBookParams } from "../../../../hooks/use-ticket-book-params";

const generateCSV = (
  data: any[],
  headers: { key: string; label: string }[],
  filename: string,
) => {
  const csvRows = [];

  // 전화번호 마스킹 함수
  function maskPhone(phone: string) {
    return phone.replace(/(\d{3})-?(\d{4})-?(\d{4})/, "$1-****-$3");
  }

  // CSV 헤더 라벨 추가
  csvRows.push(headers.map(h => h.label).join(","));

  // 데이터 추가
  data.forEach(row => {
    const values = headers.map(h => {
      let value = row[h.key];
      // telephone 컬럼이면 마스킹 처리
      if (h.key === "telephone" && typeof value === "string") {
        value = maskPhone(value);
      }
      return typeof value === "string" ? `"${value}"` : (value ?? "");
    });
    csvRows.push(values.join(","));
  });

  const dateString = formatDate(new Date().toISOString(), "compact");
  const fullFilename = `${filename}_${dateString}.csv`;

  const csvString = "\uFEFF" + csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fullFilename;
  link.click();
};

const DownloadCSV: React.FC<{
  totalElements: number;
  headers: { key: string; label: string }[];
  filename: string;
}> = ({ totalElements, headers, filename }) => {
  const { searchType, searchValue, uketEventId } = useTicketBookParams();

  const { data } = useQueryAdminTicketList({
    searchType: searchType as SearchType,
    value: searchValue,
    size: totalElements,
    uketEventId,
  });

  return (
    <button
      className="border-[0.5px] border-brand text-brand px-3 py-1 text-xs rounded shrink-0"
      onClick={() => data && generateCSV(data.timezoneData, headers, filename)}
    >
      CSV 다운로드
    </button>
  );
};
export default DownloadCSV;
