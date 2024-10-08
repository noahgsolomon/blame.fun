"use client";

import React, { useEffect } from "react";
import { useUserStore } from "./stores/user-store";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("http://localhost:3000/user", {
          credentials: "include",
        });
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    }

    fetchUser();
  }, [setUser]);
  return children;
}
