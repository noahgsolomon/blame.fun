import { create } from "zustand";

export type User = {
  id: string;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
} | null;

interface UserState {
  user: User;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));
