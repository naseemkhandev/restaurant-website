import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";
import apiClient from "@/utils/api";
import { RegisterInputState } from "@/validations/authSchema";

interface UserState {
  user: any | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  register: (data: RegisterInputState) => Promise<void>;
}

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

          if (response?.data?.success) {
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
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);