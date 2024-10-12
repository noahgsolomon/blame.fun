"use client";

import React, { useEffect } from "react";
import { useUserStore } from "./stores/user-store";
import { useEnvironmentStore } from "./stores/environment/environment-store";
import { gql, useQuery } from "@apollo/client";

const GET_DATA = gql`
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
`;

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useUserStore((state) => state.setUser);
  const setEnvironments = useEnvironmentStore((state) => state.setEnvironments);
  const { data, loading, error } = useQuery(GET_DATA);

  useEffect(() => {
    console.log(data);
    console.log(loading);
    console.log(error);
    if (data && !loading && !error) {
      console.log(data);
      setUser(data.currentUser);
      setEnvironments(data.environments);
    }
  }, [data, loading, error, setUser, setEnvironments]);

  return children;
}
