import { create } from "zustand";

type User = {
  id: string;
  fullName: string;
  email: string;
  phoneNumbers: string;
  role: string;
  isVerified: boolean;
  profileImage: string | null;
};

type AuthState = {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  token: null,
  user: null,

  setToken: (token: string) => set({ token }),

  login: (token, user) =>
    set({
      token,
      user,
    }),

  logout: () =>
    set({
      token: null,
      user: null,
    }),
}));
