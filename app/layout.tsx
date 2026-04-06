import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seanshallis.com"),
  title: {
    default: "Sean Shallis — Rosie Watches Your Rate So You Don't Have To",
    template: "%s | Sean Shallis",
  },
  description:
    "Rosie the Rate Guardian monitors your mortgage multiple times a day — so you never overpay and never get stuck with the wrong strategy. Backed by 30 years of mortgage wisdom and the 5th largest bank in the world.",
  keywords: [
    "rate guardian",
    "mortgage monitoring",
    "physician loans",
    "refinance",
    "Sean Shallis",
    "private wealth mortgage",
    "AI mortgage",
    "NJ mortgage",
  ],
  authors: [{ name: "Sean T. Shallis" }],
  openGraph: {
    title: "Sean Shallis — Guardian Family",
    description:
      "Rosie watches your rate so you don't have to. Clarity, confidence, and comfort — backed by 30 years of mortgage wisdom.",
    type: "website",
    locale: "en_US",
    siteName: "Sean Shallis | Guardian Family",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rosie Watches Your Rate So You Don't Have To",
    description:
      "Guardian Family — AI that monitors the financial blind spots most people never see.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
