import { Theme } from "frosted-ui";
import type { Metadata } from "next";
import "./globals.css";
import "frosted-ui/styles.css";
import { Providers } from "./providers";
import Header from "./header";
import DataProvider from "./data-provider";
import { ServerDataFetcher } from "./server-data-fetcher";

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
  // metadataBase: new URL("https://codetogether.com"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await ServerDataFetcher();

  return (
    <html lang="en" className={"antialiased"} suppressHydrationWarning>
      <body className="font-jetbrains">
        <Providers>
          <Theme>
            <DataProvider data={data}>
              <div className="font-jetbrains h-screen">
                <Header user={data.currentUser || null} />
                {children}
              </div>
            </DataProvider>
          </Theme>
        </Providers>
      </body>
    </html>
  );
}
