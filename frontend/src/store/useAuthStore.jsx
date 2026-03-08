import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data, isCheckingAuth: false });
      get().connectSocket();
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
      get().connectSocket();
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
      get().connectSocket();
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
      get().disconnectSocket();
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Logout failed. Please try again.");
    }
  },

  uploadProfilePic: async (data) => {
    try {
      const res = await axiosInstance.put("/profile", data);
      set({ authUser: res.data });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },

  connectSocket: async () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true, //this ensures cookies are sent with connection
    });

    socket.connect();

    set({ socket: socket });

    // listen for online users event
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
      console.log(userIds);
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
