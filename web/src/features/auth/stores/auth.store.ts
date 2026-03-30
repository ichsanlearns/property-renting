import { create } from "zustand";
import type { User } from "../../../shared/types/user.type";

type AuthState = {
  token: string | null;
  user: User | null;
  authLoading: boolean;

  setToken: (token: string) => void;
  login: ({ token, user }: { token: string; user: User }) => void;
  logout: () => void;
  setAuthLoading: (authLoading: boolean) => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  token: null,
  user: null,
  authLoading: true,

  setToken: (token: string) => set({ token }),

  login: ({ token, user }: { token: string; user: User }) =>
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
