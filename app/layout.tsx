import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
    default:
      "Sean Shallis — Eliminate Financial Blind Spots. Automatically.",
    template: "%s | Sean Shallis",
  },
  description:
    "AI-powered systems that watch your money, your rate, and your opportunities — so you don't have to. Rate Guardian. Project Guardian. Trade Guardian. Home Guardian. 30+ years of mortgage wisdom. $1B+ in transactions.",
  keywords: [
    "rate guardian",
    "guardian family",
    "mortgage monitoring",
    "physician loans",
    "refinance",
    "Sean Shallis",
    "private wealth mortgage",
    "AI mortgage",
    "NJ mortgage",
    "project guardian",
    "trade guardian",
    "home guardian",
    "financial blind spots",
    "rosie AI",
  ],
  authors: [{ name: "Sean T. Shallis" }],
  creator: "Sean T. Shallis",
  publisher: "Guardian Family",
  openGraph: {
    title: "Eliminate Financial Blind Spots. Automatically.",
    description:
      "AI-powered systems that watch your money, your rate, and your opportunities — so you don't have to. Built by Sean Shallis, backed by 30+ years of mortgage wisdom.",
    type: "website",
    locale: "en_US",
    siteName: "Sean Shallis | Guardian Family",
    url: "https://seanshallis.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eliminate Financial Blind Spots. Automatically.",
    description:
      "Rate Guardian protects the financing. Project Guardian protects the project. Trade Guardian protects the capital. Home Guardian protects the homeowner.",
    creator: "@seanshallis",
    site: "@seanshallis",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://seanshallis.com",
  },
  other: {
    "apple-mobile-web-app-title": "Guardian Family",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <ClerkProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </ClerkProvider>
      </body>
    </html>
  );
}
