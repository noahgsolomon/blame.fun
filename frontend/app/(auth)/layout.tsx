"use client";

import { useUserStore } from "../stores/user-store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useUserStore();
  if (loading || !user) return null;
  return <>{children}</>;
}
