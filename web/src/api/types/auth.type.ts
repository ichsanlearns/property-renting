export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  data: {
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
};
