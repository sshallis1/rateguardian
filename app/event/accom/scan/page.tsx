import type { Metadata } from "next";
import { ACCOMScan } from "@/components/event/ACCOMScan";

export const metadata: Metadata = {
  title: "Free Rate Check — Rosie the Rate Guardian",
  description:
    "Let Rosie check your mortgage rate for free. Zero obligation. If there's a savings opportunity, we'll show you.",
};

export default function ACCOMScanPage() {
  return <ACCOMScan />;
}
