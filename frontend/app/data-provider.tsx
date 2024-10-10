"use client";

import React, { useEffect } from "react";
import { useUserStore } from "./stores/user-store";
import { useEnvironmentStore } from "./stores/environment/environment-store";

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useUserStore((state) => state.setUser);
  const setEnvironments = useEnvironmentStore((state) => state.setEnvironments);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("fetching data");
        const [userResponse, environmentsResponse] = await Promise.all([
          fetch("http://localhost:3000/user", {
            credentials: "include",
          }),
          fetch("http://localhost:3000/environments", {
            credentials: "include",
          }),
        ]);
        const userData = await userResponse.json();
        setUser(userData.user);
        const environmentsData = await environmentsResponse.json();
        console.log("environmentsData", environmentsData);
        setEnvironments(environmentsData.environments);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }

    fetchData();
  }, [setUser, setEnvironments]);

  return children;
}
