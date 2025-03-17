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

  const handleToggleAgreement = ({ termId, isAgreed }: TermAgreedParams) => {
    const existingIndex = agreements.findIndex(item => item.termId === termId);
    let newAgreements: TermAgreedParams[];

    if (existingIndex >= 0) {
      newAgreements = [...agreements];
      newAgreements[existingIndex] = { termId, isAgreed };
    } else {
      newAgreements = [...agreements, { termId, isAgreed }];
    }

    sessionStorage.setItem("agreements", JSON.stringify(newAgreements));
    setAgreements(newAgreements);
  };

  return {
    agreements,
    handleToggleAgreement,
  };
}
