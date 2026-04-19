import type { Metadata } from "next";
import { ACCOMScan } from "@/components/event/ACCOMScan";

export const metadata: Metadata = {
  title: "Are You Overpaying? — Sean Shallis | U.S. Bank Physician Lending",
  description:
    "Most physicians overpay $50K-$200K+ in unnecessary mortgage interest. Free rate check from U.S. Bank's National Physician Loan Expert.",
};

export default function ACCOMScanPage() {
  return <ACCOMScan />;
}
