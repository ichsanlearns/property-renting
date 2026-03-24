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
  authLoading: boolean;

  setToken: (token: string) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  setAuthLoading: (authLoading: boolean) => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  token: null,
  user: null,
  authLoading: true,

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

  setAuthLoading: (authLoading: boolean) => set({ authLoading }),
}));
