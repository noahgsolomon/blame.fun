import { Theme } from "frosted-ui";
import type { Metadata } from "next";
import "./globals.css";
import "frosted-ui/styles.css";
import { Providers } from "./providers";
import Header from "./header";
import DataProvider from "./data-provider";

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
