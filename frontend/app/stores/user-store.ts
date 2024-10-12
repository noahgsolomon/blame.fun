import { create } from "zustand";

export type User = {
  id: string;
  name: string;
  image?: string | null | undefined;
  createdAt: string;
  updatedAt: string;
} | null;

interface UserState {
  user: User;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));
