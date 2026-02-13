import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: { name: "john", age: 25 },
  isLoading: false,

  login: () => {
    set({ isLoading: true });
  },
}));
