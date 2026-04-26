import type { Metadata } from "next";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { RosiePGChat } from "@/components/pg/RosiePGChat";

export const metadata: Metadata = {
  title: "Ask Rosie — Project Guardian",
  description:
    "Chat with Rosie about your renovation project. Get plain-language answers about costs, risks, and next steps.",
};

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-[color:var(--brand-cream)] text-neutral-900">
      <SpokeNav />
      <section className="py-12 md:py-16">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Ask Rosie About Your Project
            </h1>
            <p className="text-neutral-600 mb-8">
              Ask about costs, estimates, contractors, timelines, or anything
              about your renovation. Rosie speaks plain homeowner language.
            </p>
            <RosiePGChat />
          </div>
        </Container>
      </section>
      <Footer />
    </main>
  );
}
