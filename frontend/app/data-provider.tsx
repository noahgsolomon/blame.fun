"use client";

import React, { useEffect } from "react";
import { useUserStore } from "./stores/user-store";
import { useEnvironmentStore } from "./stores/environment/environment-store";
import { gql, useQuery } from "@apollo/client";
import { GetDataQuery } from "@/__generated__/graphql";
import { useRouter } from "next/navigation";

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const setLoading = useUserStore((state) => state.setLoading);
  const setEnvironments = useEnvironmentStore((state) => state.setEnvironments);
  const setRefetch = useEnvironmentStore((state) => state.setRefetch);

  const { data, loading, error, refetch } = useQuery<GetDataQuery>(gql`
    query GetData {
      currentUser {
        id
        username
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

  setRefetch(refetch);

  useEffect(() => {
    console.log(data);
    if (!data?.currentUser && !loading) {
      setLoading(false);
      router.push("/auth/login");
    } else if (data?.currentUser) {
      setUser(data.currentUser);
      if (data.environments) {
        setEnvironments(data.environments);
      }
      setLoading(false);
    }
  }, [data, loading]);

  if (loading) return null;

  return children;
}
