import type { Metadata } from "next";
import { ConnectRouter } from "@/components/connect/ConnectRouter";

export const metadata: Metadata = {
  title: "Connect with Sean Shallis — U.S. Bank Private Wealth",
  description:
    "Private Wealth Mortgage Strategist and National Physician Loan Expert. 30+ years, $1B+ in transactions. Backed by U.S. Bank.",
};

export default function ConnectPage() {
  return <ConnectRouter />;
}
