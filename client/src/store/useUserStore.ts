import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";
import apiClient from "@/utils/api";
import { LoginInputState, RegisterInputState } from "@/validations/authSchema";

type User = {
  fullname: string;
  email: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  isAdmin: boolean;
  isVerified: boolean;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  register: (input: RegisterInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  checkAuthUser: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (password: string, token: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,

      register: async (data: RegisterInputState) => {
        const loading = toast.loading("Registering...");
        set({ loading: true });
        try {
          const response = await apiClient.post("/auth/register", data);

          if (response?.status === 200) {
            toast.success(response?.data?.message);
            set({
              user: response?.data?.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message);
        } finally {
          toast.dismiss(loading);
          set({ loading: false });
        }
      },

      login: async (data: LoginInputState) => {
        const loading = toast.loading("Logging in...");
        set({ loading: true });
        try {
          const response = await apiClient.post("/auth/login", data);

          if (response?.status === 200) {
            toast.success(response?.data?.message);
            set({
              user: response?.data?.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message);
        } finally {
          toast.dismiss(loading);
          set({ loading: false });
        }
      },

      logout: async () => {
        const loading = toast.loading("Logging out...");
        set({ loading: true });
        try {
          const response = await apiClient.post("/auth/logout");

          if (response?.status === 200) {
            toast.success(response?.data?.message);
            set({
              user: null,
              isAuthenticated: false,
            });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message);
        } finally {
          toast.dismiss(loading);
          set({ loading: false });
        }
      },

      verifyEmail: async (token: string) => {
        const loading = toast.loading("Verifying email...");
        set({ loading: true });
        try {
          const response = await apiClient.get(
            `/auth/verify-email?token=${token}`
          );

          if (response?.status === 200) {
            toast.success(response?.data?.message);
            set({
              user: response?.data?.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message);
        } finally {
          toast.dismiss(loading);
          set({ loading: false });
        }
      },

      checkAuthUser: async () => {
        set({ isCheckingAuth: true });
        try {
          const response = await apiClient.get("/user/auth-user");

          if (response?.status === 200) {
            set({
              user: response?.data?.user,
              isAuthenticated: true,
              isCheckingAuth: false,
            });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message);
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      forgotPassword: async (email: string) => {
        const loading = toast.loading("Sending email...");
        set({ loading: true });
        try {
          const response = await apiClient.post("/auth/forgot-password", {
            email,
          });

          if (response?.status === 200) {
            toast.success(response?.data?.message);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message);
        } finally {
          toast.dismiss(loading);
          set({ loading: false });
        }
      },

      resetPassword: async (password: string, token: string) => {
        const loading = toast.loading("Resetting password...");
        set({ loading: true });
        try {
          const response = await apiClient.post("/auth/reset-password", {
            password,
            token,
          });

          if (response?.status === 200) {
            toast.success(response?.data?.message);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message);
        } finally {
          toast.dismiss(loading);
          set({ loading: false });
        }
      },

      updateProfile: async (data: Partial<User>) => {
        const loading = toast.loading("Updating profile...");
        set({ loading: true });
        try {
          const response = await apiClient.put("/users/update-profile", data);

          if (response?.status === 200) {
            toast.success(response?.data?.message);
            set({ user: response?.data?.user, isAuthenticated: true });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message);
        } finally {
          toast.dismiss(loading);
          set({ loading: false, user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
