type AuthResponse = {
  accessToken: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phoneNumbers: string;
    role: string;
    isVerified: boolean;
    profileImage: string;
  };
};

export type ResendTokenResponse = {
  createdAt: string;
};

export type UpdateProfileResponse = {
  user: {
    id: string;
    fullName: string;
    email: string;
    phoneNumbers?: string;
    role: string;
    isVerified: boolean;
    profileImage?: string;
  };
};

export type LoginResponse = AuthResponse;

export type RefreshSessionResponse = AuthResponse;
