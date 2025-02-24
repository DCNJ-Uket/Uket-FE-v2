export type UserInfoResponse = {
  name: string;
  depositorName: string;
  profileImage: string;
  isRegistered: boolean;
  phoneNumber: string;
  universityName: string;
  studentMajor: string;
  studentCode: string;
  universityEmail: string;
};

export type UserInfoUpdateRequest = {
  depositorName: string;
  phoneNumber: string;
};

export type DeleteUserResponse = {
  userId: number;
  name: string;
};
