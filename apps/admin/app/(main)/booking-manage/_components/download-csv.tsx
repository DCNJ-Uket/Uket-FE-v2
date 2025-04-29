/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate } from "@uket/util/time";
import React from "react";

const generateCSV = (
  data: any[],
  headers: { key: string; label: string }[],
  filename: string,
) => {
  const csvRows = [];

  // CSV 헤더 라벨 추가
  csvRows.push(headers.map(h => h.label).join(","));

  // 데이터 추가
  data.forEach(row => {
    const values = headers.map(h => {
      const value = row[h.key];
      return typeof value === "string" ? `"${value}"` : (value ?? "");
    });
    csvRows.push(values.join(","));
  });

  const dateString = formatDate(new Date().toISOString(), "compact");
  const fullFilename = `${filename}_${dateString}.csv`;

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fullFilename;
  link.click();
};

const DownloadCSV: React.FC<{
  data: any[];
  headers: { key: string; label: string }[];
  filename: string;
}> = ({ data, headers, filename }) => {
  return (
    <button
      className="border-[0.5px] border-brand text-brand px-3 py-1 text-xs rounded"
      onClick={() => generateCSV(data, headers, filename)}
    >
      CSV 다운로드
    </button>
  );
};
export default DownloadCSV;
