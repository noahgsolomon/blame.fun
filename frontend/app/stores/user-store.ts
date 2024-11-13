import { create } from "zustand";

export type User = {
  id: string;
  username: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
  location: string;
  bio: string;
  website: string;
  twitter: string;
  github: string;
  name: string;
  email: string;
  avatar: string;
} | null;

interface UserState {
  user: User;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: true,
  setUser: (user: User) => set({ user }),
  setLoading: (loading: boolean) => set({ loading }),
}));
