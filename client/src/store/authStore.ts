import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  setAuth: (accessToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  setAuth: (accessToken) => set({ accessToken }),
  clearAuth: () => set({ accessToken: null }),
}));
