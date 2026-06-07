import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://underdarkecho.github.io/waterUse";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Water Footprint Calculator — How Much Water Did You Just Use?",
  description:
    "Honest water estimates for AI and daily life. Research-backed figures, full citations, and context on why AI is worth it and how water cycles back.",
  openGraph: {
    title: "Water Footprint Calculator",
    description:
      "How much water did you just use? Research-backed estimates for AI queries, streaming, and daily life.",
    url: siteUrl,
    siteName: "Water Footprint Calculator",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Water Footprint Calculator",
    description:
      "How much water did you just use? Research-backed estimates for AI and daily life.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}