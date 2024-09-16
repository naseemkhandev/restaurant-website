import apiClient from "@/utils/api";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useRestaurantStore = create()(
  persist(
    (set) => ({
      loading: false,
      restaurant: [],
      searchedRestaurants: [],

      createRestaurant: async (formData: FormData) => {
        const loading = toast.loading("Creating restaurant...");
        set({ loading: true });
        try {
          const response = await apiClient.post("/restaurans", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 201) {
            toast.success(response?.data?.message);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || error?.message);
        } finally {
          toast.dismiss(loading);
          set({ loading: false });
        }
      },

      getRestaurant: async () => {
        set({ loading: true });
        try {
          const response = await apiClient.get("/restaurants");
          if (response?.status === 200) {
            set({
              loading: false,
              restaurant: response?.data?.restaurant,
            });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || error?.message);
        } finally {
          set({ loading: false });
        }
      },

      updateRestaurant: async (formData: FormData) => {
        const loading = toast.loading("Updating restaurant...");
        set({ loading: true });
        try {
          const response = await apiClient.put("/restaurans", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 200) {
            toast.success(response?.data?.message);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || error?.message);
        } finally {
          toast.dismiss(loading);
          set({ loading: false });
        }
      },

      searchRestaurant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisines: []
      ) => {
        set({ loading: true });
        try {
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines.join(","));

          const response = await apiClient.get(
            `/restaurans/search/${searchText}?${params.toString()}`
          );

          if (response.status === 200) {
            toast.success(response?.data?.message);
            set({
              loading: false,
              searchedRestaurants: response?.data?.restaurants,
            });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || error?.message);
        } finally {
          set({ loading: false });
        }
      },
    }),
    { name: "restaurant-store", storage: createJSONStorage(() => localStorage) }
  )
);
