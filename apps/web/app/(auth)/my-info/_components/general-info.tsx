import { Button } from "@ui/components/ui/button";
import { getQueryClient } from "@uket/api/get-query-client";
import { useMutationUpdateUserInfo } from "@uket/api/mutations/use-mutation-update-user-info";
import { user } from "@uket/api/queries/user";
import { UserInfoResponse } from "@uket/api/types/user";
import { useState } from "react";
import InfoItem from "./info-item";

interface GeneralInfoProps {
  userInfo: UserInfoResponse;
}

const depositorNameRegex = /^([가-힣]{2,4}|[a-zA-Z]{2,10})$/;
const phoneNumberRegex = /^\d{3}-?\d{4}-?\d{4}$/;

export default function GeneralInfo({ userInfo }: GeneralInfoProps) {
  const queryClient = getQueryClient();
  const { mutate } = useMutationUpdateUserInfo();

  const [isEdit, setIsEdit] = useState(false);
  const [editedContents, setEditedContents] = useState({
    depositorName: userInfo.depositorName,
    phoneNumber: userInfo.phoneNumber,
  });
  const [errors, setErrors] = useState({ depositorName: "", phoneNumber: "" });

  const validateInputs = () => {
    const newErrors = { depositorName: "", phoneNumber: "" };

    if (!depositorNameRegex.test(editedContents.depositorName)) {
      newErrors.depositorName = "입금자명은 한글 또는 영문만 가능합니다.";
    }
    if (!phoneNumberRegex.test(editedContents.phoneNumber)) {
      newErrors.phoneNumber =
        "010-1234-5678 혹은 01012345678 형식으로 입력하세요.";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleCancel = () => {
    setEditedContents({
      depositorName: userInfo.depositorName,
      phoneNumber: userInfo.phoneNumber,
    });
    setErrors({ depositorName: "", phoneNumber: "" });
    setIsEdit(false);
  };

  const handleUpdate = () => {
    const validationErrors = validateInputs();
    if (validationErrors.depositorName || validationErrors.phoneNumber) {
      return;
    }

    mutate(
      {
        depositorName: editedContents.depositorName,
        phoneNumber: editedContents.phoneNumber,
      },
      {
        onSuccess: () => {
          setIsEdit(false);
          setErrors({ depositorName: "", phoneNumber: "" });
          queryClient.invalidateQueries({ queryKey: user.info().queryKey });
        },
      },
    );
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    return match ? `${match[1]}-${match[2]}-${match[3]}` : value;
  };

  return (
    <main className="flex flex-col gap-2 mt-1">
      <main className="flex w-full flex-col gap-2 bg-white px-6 pb-6 pt-4">
        <div className="flex h-8 items-center justify-between">
          <div className="text-lg font-bold text-[#17171B]">프로필</div>
          {isEdit ? (
            <div className="flex gap-6">
              <Button
                variant="link"
                className="cursor-pointer p-0 pr-px text-sm  text-[#8989A1] underline"
                onClick={handleCancel}
              >
                취소
              </Button>
              <Button
                variant="link"
                className="cursor-pointer p-0 pr-px text-sm text-[#724FFD] underline"
                onClick={handleUpdate}
              >
                저장
              </Button>
            </div>
          ) : (
            <Button
              variant="link"
              className="cursor-pointer p-0 pr-px text-sm text-[#5E5E6E] underline"
              onClick={() => setIsEdit(true)}
            >
              편집
            </Button>
          )}
        </div>

        <div className="mb-3 w-full border-t-[0.3px] border-[#5E5E6E] opacity-50"></div>

        <div className="flex flex-col gap-[10px]">
          <InfoItem
            title="이름(입금자명)"
            content={editedContents.depositorName}
            isEdit={isEdit}
            onChange={e =>
              setEditedContents(prev => ({
                ...prev,
                depositorName: e.target.value,
              }))
            }
            error={errors.depositorName}
          />
          <InfoItem
            title="전화번호"
            content={formatPhoneNumber(editedContents.phoneNumber)}
            isEdit={isEdit}
            onChange={e =>
              setEditedContents(prev => ({
                ...prev,
                phoneNumber: e.target.value,
              }))
            }
            error={errors.phoneNumber}
          />
        </div>
      </main>
    </main>
  );
}
