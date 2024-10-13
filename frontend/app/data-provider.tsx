"use client";

import React, { useEffect } from "react";
import { useUserStore } from "./stores/user-store";
import { useEnvironmentStore } from "./stores/environment/environment-store";
import { gql, useQuery } from "@apollo/client";
import { GetDataQuery } from "@/__generated__/graphql";

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useUserStore((state) => state.setUser);
  const setEnvironments = useEnvironmentStore((state) => state.setEnvironments);

  const { data, loading } = useQuery<GetDataQuery>(gql`
    query GetData {
      currentUser {
        id
        name
        image
        createdAt
        updatedAt
      }
      environments {
        id
        name
        createdAt
        updatedAt
      }
    }
  `);

  useEffect(() => {
    if (data?.currentUser) {
      setUser(data.currentUser);
    }
    if (data?.environments) {
      setEnvironments(data.environments);
    }
  }, [data, loading]);

  if (loading) {
    return null;
  }

  return children;
}
