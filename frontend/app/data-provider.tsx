"use client";

import React, { useEffect } from "react";
import { useUserStore } from "./stores/user-store";
import { gql, useQuery } from "@apollo/client";
import { GetDataQuery } from "@/__generated__/graphql";
import { useRouter } from "next/navigation";
import { GET_CURRENT_USER, GET_USER_PROFILE } from "@/lib/queries";

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const setLoading = useUserStore((state) => state.setLoading);

  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    console.log(data);
    if (!data?.currentUser && !loading) {
      setLoading(false);
      router.push("/auth/login");
    } else if (data?.currentUser) {
      setUser(data.currentUser);
      setLoading(false);
    }
  }, [data, loading]);

  if (loading) return null;

  return children;
}
