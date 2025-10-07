import { create } from "zustand";
import { authHelpers } from "src/helpers/auth.helpers";
import type { User } from "src/types/auth.type";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  loadAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  setAuth: (token, user) => {
    authHelpers.setAuth({ token, user });
    set({ token, user, isAuthenticated: true });
  },

  clearAuth: () => {
    authHelpers.clearAuth();
    set({ token: null, user: null, isAuthenticated: false });
  },

  loadAuth: () => {
    const { accessToken, user } = authHelpers.getAuth();
    if (accessToken && user) {
      set({ token: accessToken, user, isAuthenticated: true });
    }
  },
}));
