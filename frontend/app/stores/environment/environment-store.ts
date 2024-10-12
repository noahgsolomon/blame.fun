import { create } from "zustand";

export interface Environment {
  id: string;
  name?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface EnvironmentState {
  environments: Environment[];
  setEnvironments: (environments: Environment[]) => void;
}

export const useEnvironmentStore = create<EnvironmentState>((set) => ({
  environments: [],
  setEnvironments: (newEnvironments: Environment[]) =>
    set({ environments: newEnvironments }),
}));
