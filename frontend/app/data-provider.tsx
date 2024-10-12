"use client";

import React from "react";
import { useUserStore } from "./stores/user-store";
import { useEnvironmentStore } from "./stores/environment/environment-store";
import { GetDataQuery } from "@/graphql/graphql";

export default function DataProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: GetDataQuery;
}) {
  const setUser = useUserStore((state) => state.setUser);
  const setEnvironments = useEnvironmentStore((state) => state.setEnvironments);

  setUser(data.currentUser!);
  setEnvironments(data.environments!);

  return children;
}
