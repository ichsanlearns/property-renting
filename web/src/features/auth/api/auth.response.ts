type AuthResponse = {
  accessToken: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
    isVerified: boolean;
    profileImage: string;
  };
};

export type VerifyPasswordResponse = {
  email: string;
};

export type ResendTokenResponse = {
  createdAt: string;
};

export type LoginResponse = AuthResponse;

export type RefreshSessionResponse = AuthResponse;
