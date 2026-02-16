import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

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

  login: async (payload) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post("/auth/login", payload);
      set({ authUser: res.data });
      toast.success("Login successful!");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
      );
      set({ authUser: null });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Logout failed. Please try again.");
    }
  },
}));
