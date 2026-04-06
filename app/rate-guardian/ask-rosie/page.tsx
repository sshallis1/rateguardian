import type { Metadata } from "next";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { AskRosieChat } from "@/components/chat/AskRosieChat";

export const metadata: Metadata = {
  title: "Ask Rosie — Check Your Mortgage Rate in 90 Seconds",
  description:
    "Chat with Rosie the Rate Guardian. Free. No credit impact. Get your Savings Score and see if you're overpaying.",
};

export default function AskRosiePage() {
  return (
    <main className="min-h-screen bg-[color:var(--brand-cream)] flex flex-col">
      <SpokeNav />
      <AskRosieChat />
    </main>
  );
}
