import { Theme } from "frosted-ui";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import "./globals.css";
import "frosted-ui/styles.css";
import { ThemeProvider } from "./providers";

const jetbrains = localFont({
  src: "../public/JetBrainsMonoNerdFontMono-Regular.ttf",
});

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
    <html
      lang="en"
      className={cn("antialiased", jetbrains.className)}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <Theme>{children}</Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
