import type { Metadata } from "next";
import "./globals.css";
import "frosted-ui/styles.css";
import { Providers } from "./providers";
import Header from "./header";
import DataProvider from "./data-provider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blame.fun",
  description: "Make coding fun again",
  keywords: ["coding", "fun", "programming", "web3", "blockchain", "solana"],
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
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <DataProvider>
            <div className="flex flex-col min-h-screen font-jetbrains">
              <Header />
              <main className="flex-grow">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 md:py-16">
                  {children}
                </div>
              </main>
            </div>
          </DataProvider>
        </Providers>
      </body>
    </html>
  );
}
