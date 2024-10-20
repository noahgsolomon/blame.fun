import { Theme } from "frosted-ui";
import type { Metadata } from "next";
import "./globals.css";
import "frosted-ui/styles.css";
import { Providers } from "./providers";
import Header from "./header";
import DataProvider from "./data-provider";
import { getSession } from "@/auth";

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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en" className={"antialiased"} suppressHydrationWarning>
      <body className="font-jetbrains">
        <Providers session={session}>
          <Theme>
            <DataProvider>
              <div className="font-jetbrains h-screen">
                {session && <Header />}
                {children}
              </div>
            </DataProvider>
          </Theme>
        </Providers>
      </body>
    </html>
  );
}
