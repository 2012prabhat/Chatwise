"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isHydrated: false, // 👈 added flag

      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),

      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(); // 👈 called when persisted state is loaded
      },
    }
  )
);

export default useAuthStore;
