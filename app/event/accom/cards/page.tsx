import type { Metadata } from "next";
import { PrintableCards } from "@/components/event/PrintableCards";

export const metadata: Metadata = {
  title: "ACCOM CTA Cards — Print Ready",
  description: "4-up double-sided CTA cards for ACCOM conference. Print on 8.5x11 card stock.",
};

export default function CardsPage() {
  return <PrintableCards />;
}
