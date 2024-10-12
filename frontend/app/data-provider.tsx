"use client";

import React, { useEffect } from "react";
import { useUserStore } from "./stores/user-store";
import { useEnvironmentStore } from "./stores/environment/environment-store";
import { GetDataQuery, useGetDataQuery } from "@/graphql/graphql";

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useUserStore((state) => state.setUser);
  const setEnvironments = useEnvironmentStore((state) => state.setEnvironments);

  const { data, loading } = useGetDataQuery();

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
