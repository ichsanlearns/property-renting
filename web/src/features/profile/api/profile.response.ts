export type UpdateProfileResponse = {
  user: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    role: string;
    isVerified: boolean;
    profileImage?: string;
  };
};
