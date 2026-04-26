export type FillProfileResponse = {
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
