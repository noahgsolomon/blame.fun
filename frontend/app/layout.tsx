import { Theme } from "frosted-ui";
import type { Metadata } from "next";
import "./globals.css";
import "frosted-ui/styles.css";
import { Providers } from "./providers";
import Header from "./header";
import DataProvider from "./data-provider";
import client from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";

export const metadata: Metadata = {
  title: "Code Together",
  description: "Code w/ ur homies",
  keywords: ["interactive coding"],
  publisher: "Noah Solomon",
  creator: "Noah Solomon",
  authors: [{ name: "Noah Solomon", url: "https://x.com/noahgsolomon" }],
  alternates: {
    languages: {
      en: "/",
    },
  },
  // metadataBase: new URL("https://noahgsolomon.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={"antialiased"} suppressHydrationWarning>
      <body className="font-jetbrains">
        <Providers>
          <Theme>
            <DataProvider>
              <div className="font-jetbrains h-screen">
                <Header />
                {children}
              </div>
            </DataProvider>
          </Theme>
        </Providers>
      </body>
    </html>
  );
}
