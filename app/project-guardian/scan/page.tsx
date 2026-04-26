import type { Metadata } from "next";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { EstimateScanner } from "@/components/pg/EstimateScanner";

export const metadata: Metadata = {
  title: "Scan My Estimate — Project Guardian",
  description:
    "Upload a contractor estimate and let Rosie help you understand the cost, compare it locally, and find smarter ways to complete the work.",
};

export default function ScanPage() {
  return (
    <main className="min-h-screen bg-[color:var(--brand-cream)] text-neutral-900">
      <SpokeNav />
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Scan My Estimate
            </h1>
            <p className="text-lg text-neutral-600 mb-10">
              Upload your contractor estimate and Rosie will help you understand
              the cost, compare it to local benchmarks, and flag anything that
              looks high.
            </p>
            <EstimateScanner />
          </div>
        </Container>
      </section>
      <Footer />
    </main>
  );
}
