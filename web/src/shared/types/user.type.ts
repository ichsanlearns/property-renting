export type User = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  isVerified: boolean;
  profileImage?: string;
};
