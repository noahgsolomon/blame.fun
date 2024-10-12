"use client";

import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import { Theme } from "frosted-ui";
import { ReactNode, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";

interface ThemeProviderProps {
  children: ReactNode;
}

function ThemeWrapper({ children }: { children: ReactNode }) {
  const { theme, resolvedTheme } = useTheme();
  const appearance = (resolvedTheme || theme) as "light" | "dark";

  return (
    <Theme
      appearance={appearance}
      grayColor="slate"
      accentColor="iris"
      infoColor="sky"
      successColor="green"
      warningColor="yellow"
      dangerColor="red"
    >
      {children}
      <Toaster richColors position="top-center" />
    </Theme>
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
    <NextThemeProvider attribute="class">
      <ThemeWrapper>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </ThemeWrapper>
    </NextThemeProvider>
  );
}
