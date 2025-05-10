import { TermAgreedParams } from "@uket/api/types/term";
import { useEffect, useState } from "react";

export function useTermAgreement() {
  const [agreements, setAgreements] = useState<TermAgreedParams[]>([]);

  useEffect(() => {
    const storedAgreements = JSON.parse(
      sessionStorage.getItem("agreements") || "[]",
    );
    setAgreements(storedAgreements);
  }, []);

  const handleToggleAgreement = ({
    type,
    termId,
    isAgreed,
    documentId,
  }: TermAgreedParams) => {
    const existingIndex = agreements.findIndex(item => item.termId === termId);
    let newAgreements: TermAgreedParams[];

    if (existingIndex >= 0) {
      newAgreements = [...agreements];
      newAgreements[existingIndex] = { type, termId, isAgreed, documentId };
    } else {
      newAgreements = [...agreements, { type, termId, isAgreed, documentId }];
    }

    sessionStorage.setItem("agreements", JSON.stringify(newAgreements));
    setAgreements(newAgreements);
  };

  return {
    agreements,
    handleToggleAgreement,
  };
}
