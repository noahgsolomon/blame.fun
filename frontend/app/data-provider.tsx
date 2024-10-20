"use client";

import React, { useEffect } from "react";
import { useUserStore } from "./stores/user-store";
import { useEnvironmentStore } from "./stores/environment/environment-store";
import { gql, useQuery } from "@apollo/client";
import { GetDataQuery } from "@/__generated__/graphql";
import { useSession } from "next-auth/react";

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useUserStore((state) => state.setUser);
  const setEnvironments = useEnvironmentStore((state) => state.setEnvironments);
  const setRefetch = useEnvironmentStore((state) => state.setRefetch);

  // const { data, loading, refetch } = useQuery<GetDataQuery>(gql`
  //   query GetData {
  //     currentUser {
  //       id
  //       name
  //       image
  //       createdAt
  //       updatedAt
  //     }
  //     environments {
  //       id
  //       name
  //       createdAt
  //       updatedAt
  //     }
  //   }
  // `);

  // setRefetch(refetch);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user) {
        const response = await fetch("http://localhost:3000/user", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      }
    };

    fetchUserData();
  }, [session]);

  // if (loading) {
  //   return null;
  // }

  return children;
}
