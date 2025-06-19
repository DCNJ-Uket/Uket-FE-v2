export type UserInfoResponse = {
  name: string;
  email: string;
  depositorName: string;
  profileImagePath: string;
  isRegistered: boolean;
  phoneNumber: string;
};

export type UserInfoUpdateRequest = {
  depositorName: string;
  phoneNumber: string;
};

export type DeleteUserResponse = {
  userId: number;
  isSuccess: boolean;
};
