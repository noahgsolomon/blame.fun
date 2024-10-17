import { GetDataQuery } from "@/__generated__/graphql";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { create } from "zustand";

export interface Environment {
  id: string;
  name?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type DataRefetch = (
  variables?: Partial<OperationVariables> | undefined
) => Promise<ApolloQueryResult<GetDataQuery>>;

interface EnvironmentState {
  environments: Environment[];
  setEnvironments: (environments: Environment[]) => void;
  refetch: DataRefetch | null;
  setRefetch: (refetch: DataRefetch) => void;
}

export const useEnvironmentStore = create<EnvironmentState>((set) => ({
  environments: [],
  setEnvironments: (newEnvironments: Environment[]) =>
    set({ environments: newEnvironments }),
  refetch: null,
  setRefetch: (newRefetch: DataRefetch) => set({ refetch: newRefetch }),
}));
