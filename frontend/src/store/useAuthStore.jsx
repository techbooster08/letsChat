import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data, isCheckingAuth: false });
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (payload) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signup", payload);
      set({ authUser: res.data });
      toast.success("Signup successful! Welcome to LetsChat.");
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again.",
      );
      set({ authUser: null });
    } finally {
      set({ isSigningUp: false });
    }
  },
}));
