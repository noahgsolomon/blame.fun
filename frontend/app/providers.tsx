"use client";

import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import { Toaster } from "@/components/ui/toaster";

interface ThemeProviderProps {
  children: ReactNode;
}

function ThemeWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}

export function Providers({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeWrapper>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </ThemeWrapper>
    </NextThemeProvider>
  );
}
