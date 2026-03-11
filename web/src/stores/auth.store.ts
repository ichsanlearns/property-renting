import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "auth-storage",
    },
  ),
);
